import {NextResponse} from "next/server";
import {z} from "zod";
import {requireStaffOwner} from "@/lib/staff/authorization";
import {staffPortalConfigured} from "@/lib/staff/config";
import {staffPasswordSchema} from "@/lib/staff/validation";
import {encryptStaffPassword} from "@/lib/staff/password-vault";

const updateSchema = z.discriminatedUnion("action", [
  z.object({action: z.literal("reset-password"), password: staffPasswordSchema}),
  z.object({action: z.literal("set-active"), isActive: z.boolean()}),
]);

export async function PATCH(request: Request, context: {params: Promise<{userId: string}>}) {
  if (!staffPortalConfigured) return NextResponse.json({error: "尚未設定"}, {status: 503});
  const authorization = await requireStaffOwner();
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const {userId} = await context.params;
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({error: "資料格式錯誤"}, {status: 400});

  const {data: target} = await authorization.service
    .from("staff_profiles")
    .select("user_id, account_code, display_name, job_title, role")
    .eq("user_id", userId)
    .eq("organization_id", authorization.profile.organization_id)
    .not("account_code", "is", null)
    .maybeSingle();
  if (!target) return NextResponse.json({error: "找不到帳號"}, {status: 404});

  if (parsed.data.action === "reset-password") {
    const {error} = await authorization.service.auth.admin.updateUserById(userId, {password: parsed.data.password});
    if (error) return NextResponse.json({error: "無法重設密碼"}, {status: 500});
    await authorization.service.from("staff_profiles").update({password_vault: encryptStaffPassword(parsed.data.password), failed_attempts: 0, locked_until: null}).eq("user_id", userId);
    await authorization.service.from("audit_logs").insert({organization_id: authorization.profile.organization_id, actor_user_id: authorization.user.id, action: "staff.password_reset", target_user_id: userId});
    return NextResponse.json({account: {...target, password: parsed.data.password}});
  }

  const {error} = await authorization.service.from("staff_profiles").update({is_active: parsed.data.isActive, failed_attempts: 0, locked_until: null}).eq("user_id", userId);
  if (error) return NextResponse.json({error: "無法更新帳號狀態"}, {status: 500});
  await authorization.service.auth.admin.updateUserById(userId, {ban_duration: parsed.data.isActive ? "none" : "876000h"});
  await authorization.service.from("audit_logs").insert({organization_id: authorization.profile.organization_id, actor_user_id: authorization.user.id, action: parsed.data.isActive ? "staff.account_enabled" : "staff.account_disabled", target_user_id: userId});
  return NextResponse.json({success: true});
}
