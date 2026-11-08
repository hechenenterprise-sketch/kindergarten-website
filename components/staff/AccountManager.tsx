"use client";

import {FormEvent, useState} from "react";
import {generateNumericPassword} from "@/lib/staff/validation";

export type StaffAccount = {
  user_id: string;
  account_code: string;
  display_name: string;
  job_title: string;
  role: "principal" | "director" | "office" | "teacher";
  is_active: boolean;
  last_login_at?: string | null;
  password?: string | null;
};

const roleLabels = {principal: "園長", director: "主任", office: "行政", teacher: "老師"};

export default function AccountManager({initialAccounts}: {initialAccounts: StaffAccount[]}) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [visiblePasswords, setVisiblePasswords] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<StaffAccount | null>(null);
  const [form, setForm] = useState({accountCode: "", password: "", displayName: "", jobTitle: "", role: "teacher" as StaffAccount["role"]});

  function generatePassword() {
    setForm((current) => ({...current, password: generateNumericPassword()}));
  }

  async function createAccount(event: FormEvent) {
    event.preventDefault();
    setSaving(true); setError(""); setMessage("");
    const response = await fetch("/api/staff/accounts", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(form)});
    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "無法建立帳號");
      setSaving(false);
      return;
    }
    const account = result.account;
    setAccounts((current) => [...current, {user_id: account.userId, account_code: account.accountCode, display_name: account.displayName, job_title: account.jobTitle, role: account.role, is_active: true, last_login_at: null, password: account.password}]);
    setForm({accountCode: "", password: "", displayName: "", jobTitle: "", role: "teacher"});
    setMessage("帳號已建立，密碼已加密保存；管理員之後仍可在帳號清單中查看。");
    setSaving(false);
  }

  async function resetPassword(account: StaffAccount) {
    const password = generateNumericPassword();
    const response = await fetch(`/api/staff/accounts/${account.user_id}`, {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({action: "reset-password", password})});
    const result = await response.json();
    if (!response.ok) { setError(result.error || "無法重設密碼"); return; }
    setAccounts((current) => current.map((item) => item.user_id === account.user_id ? {...item, password} : item));
    setMessage(`${account.display_name} 的密碼已重設並加密保存。`);
  }

  async function toggleAccount(account: StaffAccount) {
    const isActive = !account.is_active;
    const response = await fetch(`/api/staff/accounts/${account.user_id}`, {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({action: "set-active", isActive})});
    const result = await response.json();
    if (!response.ok) { setError(result.error || "無法更新帳號"); return; }
    setAccounts((current) => current.map((item) => item.user_id === account.user_id ? {...item, is_active: isActive} : item));
    setMessage(`${account.display_name} 已${isActive ? "啟用" : "停用"}。`);
  }

  async function updateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing) return;
    setSaving(true); setError(""); setMessage("");
    const response = await fetch(`/api/staff/accounts/${editing.user_id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        action: "update-profile",
        accountCode: editing.account_code,
        displayName: editing.display_name,
        jobTitle: editing.job_title,
        role: editing.role,
      }),
    });
    const result = await response.json();
    if (!response.ok) setError(result.error || "無法修改帳號");
    else {
      setAccounts((current) => current.map((item) => item.user_id === editing.user_id ? {...item, ...result.account} : item));
      setEditing(null);
      setMessage("帳號資料與權限已更新。");
    }
    setSaving(false);
  }

  async function deleteAccount(account: StaffAccount) {
    if (!window.confirm(`確定要永久刪除「${account.display_name}」的帳號嗎？刪除後無法恢復。`)) return;
    setError(""); setMessage("");
    const response = await fetch(`/api/staff/accounts/${account.user_id}`, {method: "DELETE"});
    const result = await response.json();
    if (!response.ok) setError(result.error || "無法刪除帳號");
    else {
      setAccounts((current) => current.filter((item) => item.user_id !== account.user_id));
      if (editing?.user_id === account.user_id) setEditing(null);
      setMessage(`${account.display_name} 的帳號已刪除。`);
    }
  }

  function togglePassword(userId: string) {
    setVisiblePasswords((current) => current.includes(userId) ? current.filter((id) => id !== userId) : [...current, userId]);
  }

  return <div className="space-y-7">
    {(message || error) && <div className={`rounded-2xl px-5 py-4 text-sm leading-6 ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{error || message}</div>}
    {editing && <section className="rounded-3xl border-2 border-pink-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-slate-800">修改帳號</h2><button type="button" onClick={() => setEditing(null)} className="text-sm text-slate-500 underline">取消</button></div>
      <form onSubmit={updateAccount} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">使用者名字<input required value={editing.display_name} onChange={(event) => setEditing({...editing, display_name: event.target.value})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"/></label>
        <label className="text-sm text-slate-600">職位<input required value={editing.job_title} onChange={(event) => setEditing({...editing, job_title: event.target.value})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"/></label>
        <label className="text-sm text-slate-600">4 碼帳號<input required maxLength={4} value={editing.account_code} onChange={(event) => setEditing({...editing, account_code: event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 uppercase tracking-[.2em]"/></label>
        <label className="text-sm text-slate-600">系統角色<select value={editing.role} onChange={(event) => setEditing({...editing, role: event.target.value as StaffAccount["role"]})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"><option value="principal">園長</option><option value="director">主任</option><option value="office">行政</option><option value="teacher">老師</option></select></label>
        <button disabled={saving} className="h-12 rounded-full bg-[#df0873] font-semibold text-white disabled:opacity-50 md:col-span-2">{saving ? "儲存中…" : "儲存修改"}</button>
      </form>
    </section>}
    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-800">建立員工帳號</h2>
      <form onSubmit={createAccount} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">使用者名字<input required value={form.displayName} onChange={(event) => setForm({...form, displayName: event.target.value})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4" placeholder="王小美"/></label>
        <label className="text-sm text-slate-600">職位<input required value={form.jobTitle} onChange={(event) => setForm({...form, jobTitle: event.target.value})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4" placeholder="幼兒班教師"/></label>
        <label className="text-sm text-slate-600">4 碼帳號<input required maxLength={4} value={form.accountCode} onChange={(event) => setForm({...form, accountCode: event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 uppercase tracking-[.2em]" placeholder="T001"/></label>
        <label className="text-sm text-slate-600">系統角色<select value={form.role} onChange={(event) => setForm({...form, role: event.target.value as StaffAccount["role"]})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"><option value="principal">園長</option><option value="director">主任</option><option value="office">行政</option><option value="teacher">老師</option></select></label>
        <label className="text-sm text-slate-600 md:col-span-2">6 碼數字密碼<div className="mt-2 flex gap-2"><input required inputMode="numeric" maxLength={6} value={form.password} onChange={(event) => setForm({...form, password: event.target.value.replace(/\D/g, "")})} className="h-11 flex-1 rounded-xl border border-slate-200 px-4 tracking-[.2em]" placeholder="點右側自動產生"/><button type="button" onClick={generatePassword} className="rounded-xl border border-pink-200 px-4 text-sm text-[#df0873]">產生密碼</button></div></label>
        <button disabled={saving} className="mt-2 h-12 rounded-full bg-[#df0873] font-semibold text-white disabled:opacity-50 md:col-span-2">{saving ? "建立中…" : "建立帳號"}</button>
      </form>
    </section>

    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-800">現有帳號</h2>
      <div className="mt-5 space-y-3">{accounts.length ? accounts.map((account) => <article key={account.user_id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><strong className="text-slate-800">{account.display_name}</strong><span className="rounded-full bg-pink-50 px-2.5 py-1 text-xs text-[#df0873]">{roleLabels[account.role]}</span><span className={`rounded-full px-2.5 py-1 text-xs ${account.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{account.is_active ? "啟用" : "停用"}</span></div><p className="mt-1 text-sm text-slate-500">{account.job_title}・帳號 <span className="font-mono">{account.account_code}</span></p><p className="mt-2 text-sm text-slate-600">密碼：<span className="font-mono font-semibold tracking-wider">{account.password ? (visiblePasswords.includes(account.user_id) ? account.password : "••••••") : "請重設一次"}</span>{account.password && <button type="button" onClick={() => togglePassword(account.user_id)} className="ml-3 text-xs text-[#df0873] underline">{visiblePasswords.includes(account.user_id) ? "隱藏" : "顯示"}</button>}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => {setEditing({...account}); window.scrollTo({top: 0, behavior: "smooth"});}} className="rounded-xl border border-pink-200 px-3 py-2 text-xs text-[#df0873]">修改</button><button type="button" onClick={() => resetPassword(account)} className="rounded-xl border border-pink-200 px-3 py-2 text-xs text-[#df0873]">重設密碼</button><button type="button" onClick={() => toggleAccount(account)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600">{account.is_active ? "停用" : "啟用"}</button><button type="button" onClick={() => void deleteAccount(account)} className="rounded-xl border border-red-200 px-3 py-2 text-xs text-red-600">刪除</button></div></article>) : <p className="text-sm text-slate-500">尚未建立園長、主任、行政或老師帳號。</p>}</div>
    </section>
  </div>;
}
