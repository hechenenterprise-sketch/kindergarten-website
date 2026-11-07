"use server";

import {redirect} from "next/navigation";
import {staffOrganizationSlug, staffPortalConfigured} from "@/lib/staff/config";
import {staffLoginSchema} from "@/lib/staff/validation";
import {createStaffServerClient, createStaffServiceClient} from "@/lib/supabase/server";

export type StaffLoginState = {error?: string};

export async function loginStaff(
  _previousState: StaffLoginState,
  formData: FormData,
): Promise<StaffLoginState> {
  if (!staffPortalConfigured) return {error: "員工登入系統尚未完成連線設定"};

  const parsed = staffLoginSchema.safeParse({
    accountCode: formData.get("accountCode"),
    password: formData.get("password"),
  });
  if (!parsed.success) return {error: parsed.error.issues[0]?.message || "帳號或密碼格式錯誤"};

  const service = createStaffServiceClient();
  const {data: organization} = await service
    .from("organizations")
    .select("id")
    .eq("slug", staffOrganizationSlug)
    .maybeSingle();
  if (!organization) return {error: "找不到園所登入設定"};

  const {data: profile} = await service
    .from("staff_profiles")
    .select("user_id, login_email, is_active, failed_attempts, locked_until")
    .eq("organization_id", organization.id)
    .eq("account_code", parsed.data.accountCode)
    .maybeSingle();

  if (!profile?.login_email || !profile.is_active) return {error: "帳號或密碼不正確"};
  if (profile.locked_until && new Date(profile.locked_until).getTime() > Date.now()) {
    return {error: "登入錯誤次數過多，請稍後再試或聯絡管理員重設密碼"};
  }

  const supabase = await createStaffServerClient();
  const {error} = await supabase.auth.signInWithPassword({
    email: profile.login_email,
    password: parsed.data.password,
  });

  if (error) {
    const failedAttempts = (profile.failed_attempts || 0) + 1;
    const lockedUntil = failedAttempts >= 5
      ? new Date(Date.now() + 30 * 60 * 1000).toISOString()
      : null;
    await service.from("staff_profiles").update({
      failed_attempts: failedAttempts >= 5 ? 0 : failedAttempts,
      locked_until: lockedUntil,
    }).eq("user_id", profile.user_id);
    await service.from("audit_logs").insert({
      organization_id: organization.id,
      action: "staff.login_failed",
      target_user_id: profile.user_id,
      metadata: {account_code: parsed.data.accountCode},
    });
    return {error: failedAttempts >= 5 ? "登入錯誤 5 次，帳號已暫時鎖定 30 分鐘" : "帳號或密碼不正確"};
  }

  await service.from("staff_profiles").update({
    failed_attempts: 0,
    locked_until: null,
    last_login_at: new Date().toISOString(),
  }).eq("user_id", profile.user_id);
  await service.from("audit_logs").insert({
    organization_id: organization.id,
    actor_user_id: profile.user_id,
    action: "staff.login_succeeded",
  });

  redirect("/staff");
}

export async function logoutStaff() {
  if (staffPortalConfigured) {
    const supabase = await createStaffServerClient();
    await supabase.auth.signOut();
  }
  redirect("/staff-login");
}
