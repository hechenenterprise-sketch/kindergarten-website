import Image from "next/image";
import Link from "next/link";
import StaffLoginForm from "@/components/staff/StaffLoginForm";
import {staffPortalConfigured} from "@/lib/staff/config";

export const metadata = {title: "園務登入｜米堤爾幼兒園"};

export default function StaffLoginPage() {
  return <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-white to-rose-100 px-5 py-10">
    <section className="w-full max-w-md rounded-[32px] bg-white p-7 shadow-2xl shadow-pink-100/70 sm:p-10">
      <div className="flex justify-center"><Image src="/miter-logo.png" alt="米堤爾幼兒園" width={130} height={90} className="h-24 w-auto object-contain" priority/></div>
      <h1 className="mt-5 text-center text-2xl font-bold text-slate-800">園務管理系統</h1>
      <p className="mt-2 text-center text-sm leading-6 text-slate-500">主任、行政及老師請使用個人帳號登入</p>
      <StaffLoginForm configured={staffPortalConfigured}/>
      <Link href="/" className="mt-6 block text-center text-sm text-slate-500 transition hover:text-[#df0873]">← 返回網站首頁</Link>
    </section>
  </main>;
}
