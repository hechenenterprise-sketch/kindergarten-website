"use client";

import {useState} from "react";
import {createStaffBrowserClient} from "@/lib/supabase/browser";

export default function StaffAdminGoogleLogin({configured}: {configured: boolean}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function signIn() {
    if (!configured) return;
    setLoading(true);
    setError("");
    const supabase = createStaffBrowserClient();
    const {error: authError} = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {redirectTo: `${window.location.origin}/auth/callback?next=/staff-admin`},
    });
    if (authError) {
      setError("無法啟動 Google 登入，請稍後再試");
      setLoading(false);
    }
  }

  return <div className="mt-8">
    {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
    {!configured && <p className="mb-4 rounded-xl bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800">管理系統正在建置中，完成 Supabase 與 Google 連線後才會開放。</p>}
    <button type="button" onClick={signIn} disabled={!configured || loading} className="flex h-12 w-full items-center justify-center rounded-full bg-[#df0873] font-semibold text-white transition hover:bg-[#c80767] disabled:cursor-not-allowed disabled:opacity-45">{loading ? "前往 Google…" : "管理員使用 Google 登入"}</button>
  </div>;
}
