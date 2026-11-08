import Link from "next/link";
import {redirect} from "next/navigation";

import {logoutStaff} from "@/app/staff-login/actions";
import ReviewManager from "@/components/staff/ReviewManager";
import {requireStaffRoles} from "@/lib/staff/authorization";

export const dynamic = "force-dynamic";
export const metadata = {title: "內容審核｜米堤爾幼兒園"};

export default async function StaffReviewsPage() {
  const authorization = await requireStaffRoles(["owner", "principal"]);
  if (!authorization) redirect("/staff");

  return <main className="min-h-screen bg-[#fffaf4] px-5 py-8 sm:px-8"><div className="mx-auto max-w-4xl">
    <header className="mb-7 flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-white px-6 py-5 shadow-sm"><div><Link href="/staff" className="text-sm text-[#df0873]">← 返回園務工作台</Link><h1 className="mt-2 text-2xl font-bold text-slate-800">審核主任內容</h1><p className="mt-1 text-sm text-slate-500">{authorization.profile.display_name}・{authorization.profile.job_title}</p></div><form action={logoutStaff}><button className="rounded-full bg-slate-800 px-5 py-2 text-sm text-white">登出</button></form></header>
    <ReviewManager/>
  </div></main>;
}
