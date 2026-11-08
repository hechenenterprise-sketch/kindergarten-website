import {NextResponse} from "next/server";
import {z} from "zod";
import {requireStaffOwner} from "@/lib/staff/authorization";
import {staffPortalConfigured} from "@/lib/staff/config";
import {accountCodeSchema, staffPasswordSchema} from "@/lib/staff/validation";
import {encryptStaffPassword} from "@/lib/staff/password-vault";

const updateSchema = z.discriminatedUnion("action", [
  z.object({action: z.literal("reset-password"), password: staffPasswordSchema}),
  z.object({action: z.literal("set-active"), isActive: z.boolean()}),
  z.object({
    action: z.literal("update-profile"),
    accountCode: accountCodeSchema,
    displayName: z.string().trim().min(1).max(50),
    jobTitle: z.string().trim().min(1).max(50),
    role: z.enum(["principal", "director", "office", "teacher"]),
  }),
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

  if (parsed.data.action === "update-profile") {
    const {error} = await authorization.service.from("staff_profiles").update({
      account_code: parsed.data.accountCode,
      display_name: parsed.data.displayName,
      job_title: parsed.data.jobTitle,
      role: parsed.data.role,
    }).eq("user_id", userId);
    if (error) {
      const duplicate = error.code === "23505";
      return NextResponse.json({error: duplicate ? "這組 4 碼帳號已被使用" : "無法修改帳號"}, {status: 400});
    }
    await authorization.service.auth.admin.updateUserById(userId, {
      user_metadata: {display_name: parsed.data.displayName},
    });
    await authorization.service.from("audit_logs").insert({
      organization_id: authorization.profile.organization_id,
      actor_user_id: authorization.user.id,
      action: "staff.account_updated",
      target_user_id: userId,
      metadata: {account_code: parsed.data.accountCode, role: parsed.data.role},
    });
    return NextResponse.json({
      account: {
        ...target,
        account_code: parsed.data.accountCode,
        display_name: parsed.data.displayName,
        job_title: parsed.data.jobTitle,
        role: parsed.data.role,
      },
    });
  }

  const {error} = await authorization.service.from("staff_profiles").update({is_active: parsed.data.isActive, failed_attempts: 0, locked_until: null}).eq("user_id", userId);
  if (error) return NextResponse.json({error: "無法更新帳號狀態"}, {status: 500});
  await authorization.service.auth.admin.updateUserById(userId, {ban_duration: parsed.data.isActive ? "none" : "876000h"});
  await authorization.service.from("audit_logs").insert({organization_id: authorization.profile.organization_id, actor_user_id: authorization.user.id, action: parsed.data.isActive ? "staff.account_enabled" : "staff.account_disabled", target_user_id: userId});
  return NextResponse.json({success: true});
}

export async function DELETE(_request: Request, context: {params: Promise<{userId: string}>}) {
  if (!staffPortalConfigured) return NextResponse.json({error: "尚未設定"}, {status: 503});
  const authorization = await requireStaffOwner();
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const {userId} = await context.params;
  if (userId === authorization.user.id) {
    return NextResponse.json({error: "不能刪除目前登入的最高管理員"}, {status: 400});
  }
  const {data: target} = await authorization.service
    .from("staff_profiles")
    .select("user_id, account_code, display_name, role")
    .eq("user_id", userId)
    .eq("organization_id", authorization.profile.organization_id)
    .not("account_code", "is", null)
    .maybeSingle();
  if (!target) return NextResponse.json({error: "找不到帳號"}, {status: 404});
  if (target.role === "owner") return NextResponse.json({error: "不能刪除最高管理員"}, {status: 400});

  const {error} = await authorization.service.auth.admin.deleteUser(userId);
  if (error) return NextResponse.json({error: "無法刪除帳號"}, {status: 500});
  await authorization.service.from("audit_logs").insert({
    organization_id: authorization.profile.organization_id,
    actor_user_id: authorization.user.id,
    action: "staff.account_deleted",
    metadata: {deleted_user_id: userId, account_code: target.account_code, display_name: target.display_name, role: target.role},
  });
  return NextResponse.json({success: true});
}
