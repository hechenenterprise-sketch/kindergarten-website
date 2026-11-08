import Link from "next/link";
import {redirect} from "next/navigation";
import {logoutStaff} from "@/app/staff-login/actions";
import {staffPortalConfigured, staffRoleLabels, type StaffRole} from "@/lib/staff/config";
import {createStaffServerClient} from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = {title: "園務工作台｜米堤爾幼兒園"};

const roleCards: Record<StaffRole, {title: string; description: string; href: string}[]> = {
  owner: [
    {title: "待審內容", description: "審核主任、行政與老師送出的內容。", href: "/staff/reviews"},
    {title: "網站重要照片", description: "更換首頁與關於我們的圓形照片。", href: "/staff/manage/photos"},
    {title: "最新消息", description: "新增或修改校務、政府及活動資訊。", href: "/staff/manage/news"},
    {title: "活動相簿", description: "上傳活動照片並修改活動介紹。", href: "/staff/manage/gallery"},
    {title: "招生簡章", description: "上傳新版 PDF 並控制是否顯示。", href: "/staff/manage/brochure"},
  ],
  principal: [
    {title: "待審內容", description: "審核主任、行政與老師送出的內容。", href: "/staff/reviews"},
    {title: "網站重要照片", description: "更換首頁與關於我們的圓形照片。", href: "/staff/manage/photos"},
    {title: "最新消息", description: "新增或修改校務、政府及活動資訊。", href: "/staff/manage/news"},
    {title: "活動相簿", description: "上傳活動照片並修改活動介紹。", href: "/staff/manage/gallery"},
    {title: "招生簡章", description: "上傳新版 PDF 並控制是否顯示。", href: "/staff/manage/brochure"},
  ],
  director: [
    {title: "最新消息", description: "新增或修改校務、政府及活動資訊。", href: "/staff/manage/news"},
    {title: "活動相簿", description: "上傳活動照片並修改活動介紹。", href: "/staff/manage/gallery"},
    {title: "招生簡章", description: "上傳新版 PDF 並控制是否顯示。", href: "/staff/manage/brochure"},
  ],
  office: [
    {title: "最新消息", description: "新增或修改校務、政府及活動資訊。", href: "/staff/manage/news"},
    {title: "活動相簿", description: "上傳活動照片並修改活動介紹。", href: "/staff/manage/gallery"},
  ],
  teacher: [
    {title: "活動相簿", description: "上傳活動照片並整理活動介紹。", href: "/staff/manage/gallery"},
  ],
};

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
        {roleCards[role].map((card) => <Link key={card.href} href={card.href} className="group rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><span className="text-xs font-semibold tracking-wider text-pink-400">開啟管理</span><h2 className="mt-3 text-xl font-semibold text-slate-800 group-hover:text-[#df0873]">{card.title}</h2><p className="mt-2 text-sm leading-6 text-slate-500">{card.description}</p><span className="mt-5 inline-block text-sm text-[#df0873]">進入功能 →</span></Link>)}
      </section>
    </div>
  </main>;
}
