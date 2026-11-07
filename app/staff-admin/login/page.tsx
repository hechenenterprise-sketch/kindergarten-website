import Image from "next/image";
import Link from "next/link";
import {redirect} from "next/navigation";
import StaffAdminGoogleLogin from "@/components/staff/StaffAdminGoogleLogin";
import {requireStaffOwner} from "@/lib/staff/authorization";
import {staffPortalConfigured} from "@/lib/staff/config";

export const dynamic = "force-dynamic";
export const metadata = {title: "帳號管理登入｜米堤爾幼兒園"};

const errorMessages: Record<string, string> = {
  "not-allowed": "這個 Google 帳號未被授權管理員工帳號",
  oauth: "Google 登入失敗，請重新嘗試",
  "missing-code": "登入資訊不完整，請重新嘗試",
};

export default async function StaffAdminLoginPage({searchParams}: {searchParams: Promise<{error?: string}>}) {
  if (staffPortalConfigured && await requireStaffOwner()) redirect("/staff-admin");
  const {error} = await searchParams;

  return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-pink-50 px-5 py-10">
    <section className="w-full max-w-md rounded-[32px] bg-white p-7 shadow-2xl shadow-slate-200/70 sm:p-10">
      <div className="flex justify-center"><Image src="/miter-logo.png" alt="米堤爾幼兒園" width={130} height={90} className="h-24 w-auto object-contain" priority/></div>
      <h1 className="mt-5 text-center text-2xl font-bold text-slate-800">管理員帳號設定</h1>
      <p className="mt-2 text-center text-sm leading-6 text-slate-500">僅限已加入白名單的園長 Google 帳號</p>
      {error && errorMessages[error] && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessages[error]}</p>}
      <StaffAdminGoogleLogin configured={staffPortalConfigured}/>
      <Link href="/" className="mt-6 block text-center text-sm text-slate-500 transition hover:text-[#df0873]">← 返回網站首頁</Link>
    </section>
  </main>;
}
