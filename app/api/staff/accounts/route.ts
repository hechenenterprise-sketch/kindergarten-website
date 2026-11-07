import {NextResponse} from "next/server";
import {requireStaffOwner} from "@/lib/staff/authorization";
import {staffPortalConfigured, staffRoleLabels, type StaffRole} from "@/lib/staff/config";
import {decryptStaffPassword, encryptStaffPassword} from "@/lib/staff/password-vault";
import {createStaffSchema} from "@/lib/staff/validation";

export async function GET() {
  if (!staffPortalConfigured) return NextResponse.json({error: "尚未設定"}, {status: 503});
  const authorization = await requireStaffOwner();
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const {data, error} = await authorization.service
    .from("staff_profiles")
    .select("user_id, account_code, display_name, job_title, role, is_active, last_login_at, created_at, password_vault")
    .eq("organization_id", authorization.profile.organization_id)
    .not("account_code", "is", null)
    .order("created_at");
  if (error) return NextResponse.json({error: "無法讀取帳號"}, {status: 500});
  return NextResponse.json({
    accounts: (data || []).map(({password_vault, ...account}) => ({
      ...account,
      password: decryptStaffPassword(password_vault),
    })),
  });
}

export async function POST(request: Request) {
  if (!staffPortalConfigured) return NextResponse.json({error: "尚未設定"}, {status: 503});
  const authorization = await requireStaffOwner();
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const parsed = createStaffSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({error: parsed.error.issues[0]?.message || "資料格式錯誤"}, {status: 400});

  const {data: organization} = await authorization.service
    .from("organizations")
    .select("slug")
    .eq("id", authorization.profile.organization_id)
    .single();
  if (!organization) return NextResponse.json({error: "找不到園所設定"}, {status: 500});

  const loginEmail = `${organization.slug}.${parsed.data.accountCode.toLowerCase()}@staff.invalid`;
  const {data: created, error: createError} = await authorization.service.auth.admin.createUser({
    email: loginEmail,
    password: parsed.data.password,
    email_confirm: true,
    user_metadata: {display_name: parsed.data.displayName},
  });
  if (createError || !created.user) {
    const duplicate = createError?.message.toLowerCase().includes("already") || false;
    return NextResponse.json({error: duplicate ? "這組 4 碼帳號已被使用" : "無法建立帳號"}, {status: 400});
  }

  const {error: profileError} = await authorization.service.from("staff_profiles").insert({
    user_id: created.user.id,
    organization_id: authorization.profile.organization_id,
    account_code: parsed.data.accountCode,
    login_email: loginEmail,
    password_vault: encryptStaffPassword(parsed.data.password),
    display_name: parsed.data.displayName,
    job_title: parsed.data.jobTitle,
    role: parsed.data.role,
    is_active: true,
  });
  if (profileError) {
    await authorization.service.auth.admin.deleteUser(created.user.id);
    return NextResponse.json({error: "無法儲存帳號資料"}, {status: 500});
  }

  await authorization.service.from("audit_logs").insert({
    organization_id: authorization.profile.organization_id,
    actor_user_id: authorization.user.id,
    action: "staff.account_created",
    target_user_id: created.user.id,
    metadata: {account_code: parsed.data.accountCode, role: parsed.data.role},
  });

  return NextResponse.json({
    account: {
      userId: created.user.id,
      accountCode: parsed.data.accountCode,
      displayName: parsed.data.displayName,
      jobTitle: parsed.data.jobTitle,
      role: parsed.data.role,
      roleLabel: staffRoleLabels[parsed.data.role as StaffRole],
      password: parsed.data.password,
    },
  }, {status: 201});
}
