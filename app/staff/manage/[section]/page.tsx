import Link from "next/link";
import {notFound, redirect} from "next/navigation";

import {logoutStaff} from "@/app/staff-login/actions";
import ContentManager from "@/components/staff/ContentManager";
import {requireStaffRoles} from "@/lib/staff/authorization";
import type {StaffRole} from "@/lib/staff/config";

const sectionSettings = {
  news: {title: "最新消息", roles: ["owner", "principal", "director", "office"] as StaffRole[]},
  gallery: {title: "活動相簿", roles: ["owner", "principal", "director", "office", "teacher"] as StaffRole[]},
  brochure: {title: "招生簡章", roles: ["owner", "principal", "director"] as StaffRole[]},
  photos: {title: "網站重要照片", roles: ["owner", "principal"] as StaffRole[]},
};

export const dynamic = "force-dynamic";

export default async function StaffContentPage({params}: {params: Promise<{section: string}>}) {
  const {section} = await params;
  if (!(section in sectionSettings)) notFound();
  const typedSection = section as keyof typeof sectionSettings;
  const settings = sectionSettings[typedSection];
  const authorization = await requireStaffRoles(settings.roles);
  if (!authorization) redirect("/staff");

  return <main className="min-h-screen bg-[#fffaf4] px-5 py-8 sm:px-8"><div className="mx-auto max-w-4xl">
    <header className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-5 shadow-sm"><div><Link href="/staff" className="text-sm text-[#df0873]">← 返回園務工作台</Link><h1 className="mt-2 text-2xl font-bold text-slate-800">{settings.title}</h1><p className="mt-1 text-sm text-slate-500">{authorization.profile.display_name}・{authorization.profile.job_title}</p></div><form action={logoutStaff}><button className="rounded-full bg-slate-800 px-5 py-2 text-sm text-white">登出</button></form></header>
    <ContentManager section={typedSection}/>
  </div></main>;
}
