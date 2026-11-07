"use client";

import Link from "next/link";
import {useState} from "react";
import {decryptCredentialFile, type ExportedCredential} from "@/lib/staff/credential-export";

export default function CredentialFileViewer() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [credentials, setCredentials] = useState<ExportedCredential[]>([]);
  const [error, setError] = useState("");

  async function openFile() {
    if (!file || !password) {setError("請選擇檔案並輸入加密密碼"); return;}
    try {
      const result = await decryptCredentialFile(await file.text(), password);
      setCredentials(result.credentials);
      setError("");
    } catch {
      setCredentials([]);
      setError("無法解密，請確認檔案與加密密碼是否正確");
    }
  }

  return <main className="min-h-screen bg-[#fffaf4] px-5 py-8 sm:px-8">
    <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-sm sm:p-9">
      <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm text-[#df0873]">安全工具</p><h1 className="mt-1 text-2xl font-bold text-slate-800">開啟加密帳密檔案</h1></div><Link href="/staff-admin" className="rounded-full border border-pink-200 px-5 py-2 text-sm text-[#df0873]">返回帳號管理</Link></div>
      <div className="mt-7 grid gap-4 sm:grid-cols-[1fr_1fr_auto]"><input type="file" accept=".miter-accounts" onChange={(event) => setFile(event.target.files?.[0] || null)} className="rounded-xl border border-slate-200 p-3 text-sm"/><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-12 rounded-xl border border-slate-200 px-4" placeholder="加密檔案密碼"/><button type="button" onClick={openFile} className="rounded-xl bg-slate-800 px-5 py-3 text-sm text-white">解密檔案</button></div>
      {error && <p className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
      {credentials.length > 0 && <div className="mt-7"><div className="flex items-center justify-between"><h2 className="text-lg font-bold text-slate-800">帳號清單</h2><button type="button" onClick={() => window.print()} className="rounded-xl border border-slate-200 px-4 py-2 text-sm text-slate-600">列印</button></div><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead><tr className="text-slate-500"><th className="pb-3">姓名</th><th className="pb-3">職位</th><th className="pb-3">角色</th><th className="pb-3">帳號</th><th className="pb-3">密碼</th></tr></thead><tbody>{credentials.map((item, index) => <tr key={`${item.accountCode}-${index}`} className="border-t border-slate-100"><td className="py-3">{item.displayName}</td><td>{item.jobTitle}</td><td>{item.roleLabel}</td><td className="font-mono">{item.accountCode}</td><td className="font-mono font-bold tracking-wider">{item.password}</td></tr>)}</tbody></table></div></div>}
      <p className="mt-7 text-xs leading-6 text-slate-400">解密只在目前瀏覽器記憶體中進行，檔案內容不會上傳到伺服器。使用完畢請關閉頁面，不要在共用電腦保存密碼。</p>
    </div>
  </main>;
}
