import Link from "next/link";
import {redirect} from "next/navigation";
import {logoutStaff} from "@/app/staff-login/actions";
import AccountManager, {type StaffAccount} from "@/components/staff/AccountManager";
import {requireStaffOwner} from "@/lib/staff/authorization";
import {staffPortalConfigured} from "@/lib/staff/config";
import {decryptStaffPassword} from "@/lib/staff/password-vault";

export const dynamic = "force-dynamic";
export const metadata = {title: "員工帳號管理｜米堤爾幼兒園"};

export default async function StaffAdminPage() {
  if (!staffPortalConfigured) redirect("/staff-admin/login");
  const authorization = await requireStaffOwner();
  if (!authorization) redirect("/staff-admin/login");

  const {data: accounts} = await authorization.service.from("staff_profiles").select("user_id, account_code, display_name, job_title, role, is_active, last_login_at, password_vault").eq("organization_id", authorization.profile.organization_id).not("account_code", "is", null).order("created_at");
  const visibleAccounts = (accounts || []).map(({password_vault, ...account}) => ({...account, password: decryptStaffPassword(password_vault)}));

  return <main className="min-h-screen bg-[#fffaf4] px-5 py-8 sm:px-8">
    <div className="mx-auto max-w-5xl">
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-5 shadow-sm"><div><p className="text-sm text-[#df0873]">米堤爾幼兒園</p><h1 className="mt-1 text-2xl font-bold text-slate-800">員工帳號管理</h1><p className="mt-1 text-sm text-slate-500">管理員：{authorization.profile.display_name}</p></div><div className="flex gap-3"><Link href="/staff" className="rounded-full border border-pink-200 px-5 py-2 text-sm text-[#df0873]">園務工作台</Link><form action={logoutStaff}><button className="rounded-full bg-slate-800 px-5 py-2 text-sm text-white">登出</button></form></div></header>
      <AccountManager initialAccounts={visibleAccounts as StaffAccount[]}/>
    </div>
  </main>;
}
