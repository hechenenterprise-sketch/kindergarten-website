"use client";

import Link from "next/link";
import {FormEvent, useState} from "react";
import {encryptCredentialFile, type ExportedCredential} from "@/lib/staff/credential-export";
import {generateNumericPassword} from "@/lib/staff/validation";

export type StaffAccount = {
  user_id: string;
  account_code: string;
  display_name: string;
  job_title: string;
  role: "director" | "office" | "teacher";
  is_active: boolean;
  last_login_at?: string | null;
};

const roleLabels = {director: "主任", office: "行政", teacher: "老師"};

export default function AccountManager({initialAccounts}: {initialAccounts: StaffAccount[]}) {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [credentials, setCredentials] = useState<ExportedCredential[]>([]);
  const [exportPassword, setExportPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
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
    setAccounts((current) => [...current, {user_id: account.userId, account_code: account.accountCode, display_name: account.displayName, job_title: account.jobTitle, role: account.role, is_active: true, last_login_at: null}]);
    setCredentials((current) => [...current, {accountCode: account.accountCode, password: account.password, displayName: account.displayName, jobTitle: account.jobTitle, roleLabel: account.roleLabel, createdAt: new Date().toISOString()}]);
    setForm({accountCode: "", password: "", displayName: "", jobTitle: "", role: "teacher"});
    setMessage("帳號已建立；初始密碼只會在本頁顯示，請立即加密匯出。智慧型瀏覽器可能會將密碼視為登入資料，請勿儲存在共用電腦。 ");
    setSaving(false);
  }

  async function resetPassword(account: StaffAccount) {
    const password = generateNumericPassword();
    const response = await fetch(`/api/staff/accounts/${account.user_id}`, {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({action: "reset-password", password})});
    const result = await response.json();
    if (!response.ok) { setError(result.error || "無法重設密碼"); return; }
    setCredentials((current) => [...current, {accountCode: account.account_code, password, displayName: account.display_name, jobTitle: account.job_title, roleLabel: roleLabels[account.role], createdAt: new Date().toISOString()}]);
    setMessage(`${account.display_name} 的密碼已重設，請立即加密匯出。`);
  }

  async function toggleAccount(account: StaffAccount) {
    const isActive = !account.is_active;
    const response = await fetch(`/api/staff/accounts/${account.user_id}`, {method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify({action: "set-active", isActive})});
    const result = await response.json();
    if (!response.ok) { setError(result.error || "無法更新帳號"); return; }
    setAccounts((current) => current.map((item) => item.user_id === account.user_id ? {...item, is_active: isActive} : item));
    setMessage(`${account.display_name} 已${isActive ? "啟用" : "停用"}。`);
  }

  async function downloadEncryptedFile() {
    if (exportPassword.length < 8) { setError("加密檔案密碼至少需要 8 個字元"); return; }
    if (!credentials.length) { setError("目前沒有可匯出的新帳密"); return; }
    try {
      const encrypted = await encryptCredentialFile(credentials, exportPassword);
      const url = URL.createObjectURL(new Blob([encrypted], {type: "application/json"}));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `miter-staff-credentials-${new Date().toISOString().slice(0, 10)}.miter-accounts`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("加密帳密檔案已下載。確認保存後，可清除本頁的一次性密碼。");
    } catch {
      setError("無法產生加密檔案");
    }
  }

  return <div className="space-y-7">
    {(message || error) && <div className={`rounded-2xl px-5 py-4 text-sm leading-6 ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{error || message}</div>}
    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-800">建立員工帳號</h2>
      <form onSubmit={createAccount} className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="text-sm text-slate-600">使用者名字<input required value={form.displayName} onChange={(event) => setForm({...form, displayName: event.target.value})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4" placeholder="王小美"/></label>
        <label className="text-sm text-slate-600">職位<input required value={form.jobTitle} onChange={(event) => setForm({...form, jobTitle: event.target.value})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4" placeholder="幼兒班教師"/></label>
        <label className="text-sm text-slate-600">4 碼帳號<input required maxLength={4} value={form.accountCode} onChange={(event) => setForm({...form, accountCode: event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4 uppercase tracking-[.2em]" placeholder="T001"/></label>
        <label className="text-sm text-slate-600">系統角色<select value={form.role} onChange={(event) => setForm({...form, role: event.target.value as StaffAccount["role"]})} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"><option value="director">主任</option><option value="office">行政</option><option value="teacher">老師</option></select></label>
        <label className="text-sm text-slate-600 md:col-span-2">8 碼數字密碼<div className="mt-2 flex gap-2"><input required inputMode="numeric" maxLength={8} value={form.password} onChange={(event) => setForm({...form, password: event.target.value.replace(/\D/g, "")})} className="h-11 flex-1 rounded-xl border border-slate-200 px-4 tracking-[.2em]" placeholder="點右側自動產生"/><button type="button" onClick={generatePassword} className="rounded-xl border border-pink-200 px-4 text-sm text-[#df0873]">產生密碼</button></div></label>
        <button disabled={saving} className="mt-2 h-12 rounded-full bg-[#df0873] font-semibold text-white disabled:opacity-50 md:col-span-2">{saving ? "建立中…" : "建立帳號"}</button>
      </form>
    </section>

    {credentials.length > 0 && <section className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-6 sm:p-8">
      <h2 className="text-xl font-bold text-slate-800">一次性帳密（共 {credentials.length} 組）</h2>
      <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="text-slate-500"><th className="pb-3">姓名</th><th className="pb-3">職位</th><th className="pb-3">角色</th><th className="pb-3">帳號</th><th className="pb-3">初始密碼</th></tr></thead><tbody>{credentials.map((item, index) => <tr key={`${item.accountCode}-${index}`} className="border-t border-amber-200"><td className="py-3">{item.displayName}</td><td>{item.jobTitle}</td><td>{item.roleLabel}</td><td className="font-mono">{item.accountCode}</td><td className="font-mono font-bold tracking-wider">{item.password}</td></tr>)}</tbody></table></div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row"><input type="password" value={exportPassword} onChange={(event) => setExportPassword(event.target.value)} className="h-11 flex-1 rounded-xl border border-amber-300 bg-white px-4" placeholder="設定加密檔案密碼（至少 8 字元）"/><button type="button" onClick={downloadEncryptedFile} className="rounded-xl bg-slate-800 px-5 py-3 text-sm text-white">下載加密帳密檔案</button><button type="button" onClick={() => {setCredentials([]); setExportPassword("");}} className="rounded-xl border border-slate-300 px-5 py-3 text-sm text-slate-600">清除一次性密碼</button></div>
      <Link href="/staff-admin/decrypt" className="mt-4 inline-block text-sm text-[#df0873] underline">開啟既有加密帳密檔案</Link>
    </section>}

    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-800">現有帳號</h2>
      <div className="mt-5 space-y-3">{accounts.length ? accounts.map((account) => <article key={account.user_id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><strong className="text-slate-800">{account.display_name}</strong><span className="rounded-full bg-pink-50 px-2.5 py-1 text-xs text-[#df0873]">{roleLabels[account.role]}</span><span className={`rounded-full px-2.5 py-1 text-xs ${account.is_active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{account.is_active ? "啟用" : "停用"}</span></div><p className="mt-1 text-sm text-slate-500">{account.job_title}・帳號 {account.account_code}</p></div><div className="flex gap-2"><button type="button" onClick={() => resetPassword(account)} className="rounded-xl border border-pink-200 px-3 py-2 text-xs text-[#df0873]">重設密碼</button><button type="button" onClick={() => toggleAccount(account)} className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600">{account.is_active ? "停用" : "啟用"}</button></div></article>) : <p className="text-sm text-slate-500">尚未建立主任、行政或老師帳號。</p>}</div>
    </section>
  </div>;
}
