"use client";

import {useCallback, useEffect, useState} from "react";

type ReviewItem = {
  _id: string;
  section: "news" | "gallery" | "brochure";
  payloadJson: string;
  submittedByName?: string;
  submittedByRole?: string;
  submittedAt?: string;
};

const sectionLabels = {news: "最新消息", gallery: "活動相簿", brochure: "招生簡章"};
const roleLabels: Record<string, string> = {director: "主任", office: "行政", teacher: "老師"};

export default function ReviewManager() {
  const [items, setItems] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadItems = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/staff/reviews", {cache: "no-store"});
    const result = await response.json();
    if (!response.ok) setError(result.error || "無法讀取待審內容");
    else setItems(result.items || []);
    setLoading(false);
  }, []);

  useEffect(() => { void loadItems(); }, [loadItems]);

  async function review(id: string, action: "approve" | "reject") {
    setBusyId(id);
    setMessage("");
    setError("");
    const response = await fetch("/api/staff/reviews", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({id, action}),
    });
    const result = await response.json();
    if (!response.ok) setError(result.error || "無法完成審核");
    else {
      setMessage(action === "approve" ? "已核准並發布到網站。" : "已退回，此內容不會顯示在網站。 ");
      await loadItems();
    }
    setBusyId("");
  }

  return <div className="space-y-5">
    {(message || error) && <div className={`rounded-2xl px-5 py-4 text-sm ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{error || message}</div>}
    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-800">等待園長審核</h2>
      <p className="mt-2 text-sm leading-6 text-slate-500">核准後才會發布到網站；退回的內容不會公開。</p>
      {loading ? <p className="mt-6 text-sm text-slate-500">載入中…</p> : items.length === 0 ? <p className="mt-6 rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">目前沒有待審內容。</p> : <div className="mt-6 space-y-4">{items.map((item) => {
        let payload: Record<string, unknown> = {};
        try { payload = JSON.parse(item.payloadJson) as Record<string, unknown>; } catch {}
        const title = String(payload.title || "未命名內容");
        const detail = String(payload.summary || payload.description || "請開啟審核後決定是否發布。");
        return <article key={item._id} className="rounded-2xl border border-slate-100 p-5">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold text-[#df0873]">{sectionLabels[item.section]}</p><h3 className="mt-2 text-lg font-semibold text-slate-800">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p><p className="mt-3 text-xs text-slate-400">{item.submittedByName || "園務人員"}・{roleLabels[item.submittedByRole || ""] || item.submittedByRole}{item.submittedAt ? `・${new Date(item.submittedAt).toLocaleString("zh-TW")}` : ""}</p></div>
            <div className="flex gap-2"><button disabled={busyId === item._id} onClick={() => void review(item._id, "reject")} className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 disabled:opacity-50">退回</button><button disabled={busyId === item._id} onClick={() => void review(item._id, "approve")} className="rounded-full bg-[#df0873] px-4 py-2 text-sm text-white disabled:opacity-50">核准發布</button></div>
          </div>
        </article>;
      })}</div>}
    </section>
  </div>;
}
