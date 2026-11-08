"use client";

import {useActionState} from "react";
import {loginStaff, type StaffLoginState} from "@/app/staff-login/actions";

const initialState: StaffLoginState = {};

export default function StaffLoginForm({configured}: {configured: boolean}) {
  const [state, action, pending] = useActionState(loginStaff, initialState);

  return <form action={action} className="mt-8 space-y-5">
    <label className="block text-sm font-medium text-slate-700">
      4 碼帳號
      <input name="accountCode" required maxLength={4} autoCapitalize="characters" autoComplete="username" className="mt-2 h-12 w-full rounded-xl border border-pink-100 px-4 uppercase tracking-[0.28em] outline-none transition focus:border-[#df0873] focus:ring-2 focus:ring-pink-100" placeholder="T001"/>
    </label>
    <label className="block text-sm font-medium text-slate-700">
      6 碼數字密碼
      <input name="password" required minLength={6} maxLength={6} inputMode="numeric" pattern="[0-9]{6}" autoComplete="current-password" type="password" className="mt-2 h-12 w-full rounded-xl border border-pink-100 px-4 tracking-[0.25em] outline-none transition focus:border-[#df0873] focus:ring-2 focus:ring-pink-100" placeholder="••••••"/>
    </label>
    {state.error && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>}
    {!configured && <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">員工登入系統正在建置中，完成資料庫連線後才會正式開放。</p>}
    <button disabled={pending || !configured} className="flex h-12 w-full items-center justify-center rounded-full bg-[#df0873] font-semibold text-white transition hover:bg-[#c80767] disabled:cursor-not-allowed disabled:opacity-45">
      {pending ? "登入中…" : "登入園務系統"}
    </button>
  </form>;
}
