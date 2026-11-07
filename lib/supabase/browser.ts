"use client";

import {createBrowserClient} from "@supabase/ssr";

export function createStaffBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase 尚未設定");
  return createBrowserClient(url, anonKey);
}
