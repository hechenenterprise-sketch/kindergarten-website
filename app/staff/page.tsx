import Link from "next/link";
import {redirect} from "next/navigation";
import {logoutStaff} from "@/app/staff-login/actions";
import {roleCapabilities, staffPortalConfigured, staffRoleLabels, type StaffRole} from "@/lib/staff/config";
import {createStaffServerClient} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = {title: "園務工作台｜米堤爾幼兒園"};

export default async function StaffDashboardPage() {
  if (!staffPortalConfigured) redirect("/staff-login");
  const supabase = await createStaffServerClient();
  const {data: {user}} = await supabase.auth.getUser();
  if (!user) redirect("/staff-login");

  const {data: profile} = await supabase.from("staff_profiles").select("display_name, job_title, role, is_active").eq("user_id", user.id).maybeSingle();
  if (!profile?.is_active) redirect("/staff-login");
  const role = profile.role as StaffRole;

  return <main className="min-h-screen bg-[#fffaf4] px-5 py-8 sm:px-8">
    <div className="mx-auto max-w-5xl">
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-5 shadow-sm">
        <div><p className="text-sm text-[#df0873]">米堤爾幼兒園・園務工作台</p><h1 className="mt-1 text-2xl font-bold text-slate-800">{profile.display_name}</h1><p className="mt-1 text-sm text-slate-500">{profile.job_title}・{staffRoleLabels[role]}</p></div>
        <div className="flex items-center gap-3">{role === "owner" && <Link href="/staff-admin" className="rounded-full border border-pink-200 px-5 py-2 text-sm text-[#df0873]">帳號管理</Link>}<form action={logoutStaff}><button className="rounded-full bg-slate-800 px-5 py-2 text-sm text-white">登出</button></form></div>
      </header>
      <section className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {roleCapabilities[role].map((capability) => <article key={capability} className="rounded-3xl bg-white p-6 shadow-sm"><span className="text-xs font-semibold tracking-wider text-pink-400">可使用功能</span><h2 className="mt-3 text-xl font-semibold text-slate-800">{capability}</h2><p className="mt-2 text-sm leading-6 text-slate-500">內容功能將依此帳號權限顯示。</p></article>)}
      </section>
    </div>
  </main>;
}
