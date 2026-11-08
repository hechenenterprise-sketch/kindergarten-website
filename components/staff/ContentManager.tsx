"use client";

import {FormEvent, useCallback, useEffect, useState} from "react";

type Section = "news" | "gallery" | "brochure" | "photos";
type ContentItem = {
  _id: string;
  title?: string;
  category?: string;
  summary?: string;
  content?: string;
  description?: string;
  order?: number;
  imageUrl?: string;
  publish?: boolean;
  fileName?: string;
  pdfUrl?: string;
};
type PhotoSettings = {
  home?: { _id?: string; heroImageUrl?: string; heroSecondaryImageUrl?: string; heroTertiaryImageUrl?: string };
  about?: { _id?: string; imageUrl?: string; detailImageUrl?: string };
};

const categoryLabels: Record<string, string> = {school: "校務資訊", government: "政府資訊", activity: "活動資訊"};

export default function ContentManager({section}: {section: Section}) {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [brochure, setBrochure] = useState<ContentItem | null>(null);
  const [photos, setPhotos] = useState<PhotoSettings>({});
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [formKey, setFormKey] = useState(0);

  const loadItems = useCallback(async () => {
    setLoading(true);
    const response = await fetch(`/api/staff/content/${section}`, {cache: "no-store"});
    const result = await response.json();
    if (!response.ok) setError(result.error || "無法讀取內容");
    else {
      setItems(result.items || []);
      setBrochure(result.item || null);
      if (section === "photos") setPhotos(result.item || {});
    }
    setLoading(false);
  }, [section]);

  useEffect(() => { void loadItems(); }, [loadItems]);

  function startEditing(item: ContentItem | null) {
    setEditing(item);
    setMessage("");
    setError("");
    setFormKey((key) => key + 1);
    window.scrollTo({top: 0, behavior: "smooth"});
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    const formData = new FormData(event.currentTarget);
    if (editing?._id) formData.set("id", editing._id);
    if (section === "brochure" && brochure?._id) formData.set("id", brochure._id);
    if (section === "photos") {
      if (photos.home?._id) formData.set("homeId", photos.home._id);
      if (photos.about?._id) formData.set("aboutId", photos.about._id);
    }
    const response = await fetch(`/api/staff/content/${section}`, {method: "POST", body: formData});
    const result = await response.json();
    if (!response.ok) setError(result.error || "無法儲存");
    else {
      setMessage(result.pending ? "已送交園長審核，核准後才會顯示在網站。" : "已儲存，網站內容會立即更新。");
      setEditing(null);
      setFormKey((key) => key + 1);
      await loadItems();
    }
    setSaving(false);
  }

  if (section === "photos") {
    const photoFields = [
      {name: "heroImage", label: "首頁大圓照片", url: photos.home?.heroImageUrl},
      {name: "heroSecondaryImage", label: "首頁中圓照片", url: photos.home?.heroSecondaryImageUrl},
      {name: "heroTertiaryImage", label: "首頁小圓照片", url: photos.home?.heroTertiaryImageUrl},
      {name: "image", label: "關於我們大圓照片", url: photos.about?.imageUrl},
      {name: "detailImage", label: "關於我們小圓照片", url: photos.about?.detailImageUrl},
    ];
    return <div className="space-y-7">
      {(message || error) && <div className={`rounded-2xl px-5 py-4 text-sm ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{error || message}</div>}
      <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-bold text-slate-800">更換網站重要照片</h2>
        <p className="mt-2 text-sm leading-6 text-slate-500">只需選擇要更換的照片，沒有選擇的照片會保留原樣。</p>
        {loading ? <p className="mt-6 text-sm text-slate-500">載入中…</p> : <form key={formKey} onSubmit={save} className="mt-6 grid gap-5 sm:grid-cols-2">
          {photoFields.map((field) => <label key={field.name} className="rounded-2xl border border-slate-100 p-4 text-sm font-medium text-slate-700">
            {field.url ? <img src={field.url} alt={field.label} className="mb-4 aspect-video w-full rounded-xl bg-slate-50 object-cover"/> : <div className="mb-4 flex aspect-video items-center justify-center rounded-xl bg-slate-50 text-xs text-slate-400">目前沒有照片</div>}
            {field.label}
            <input name={field.name} type="file" accept="image/*" className="mt-3 block w-full rounded-xl border border-slate-200 p-3 text-xs"/>
          </label>)}
          <button disabled={saving} className="h-12 rounded-full bg-[#df0873] font-semibold text-white disabled:opacity-50 sm:col-span-2">{saving ? "儲存中…" : "儲存照片"}</button>
        </form>}
      </section>
    </div>;
  }

  return <div className="space-y-7">
    {(message || error) && <div className={`rounded-2xl px-5 py-4 text-sm ${error ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-800"}`}>{error || message}</div>}

    <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-slate-800">{editing ? "修改內容" : section === "news" ? "新增最新消息" : section === "gallery" ? "新增活動照片" : "招生簡章設定"}</h2>{editing && <button type="button" onClick={() => startEditing(null)} className="text-sm text-slate-500 underline">取消修改</button>}</div>
      <form key={formKey} onSubmit={save} className="mt-6 grid gap-4">
        <label className="text-sm text-slate-600">{section === "gallery" ? "活動名稱" : "標題"}<input name="title" required defaultValue={editing?.title || (section === "brochure" ? brochure?.title : "") || ""} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"/></label>

        {section === "news" && <>
          <label className="text-sm text-slate-600">資訊分類<select name="category" defaultValue={editing?.category || "school"} className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-4"><option value="school">校務資訊</option><option value="government">政府資訊</option><option value="activity">活動資訊</option></select></label>
          <label className="text-sm text-slate-600">摘要<textarea name="summary" defaultValue={editing?.summary || ""} rows={3} className="mt-2 w-full rounded-xl border border-slate-200 p-4"/></label>
          <label className="text-sm text-slate-600">詳細內容<textarea name="content" defaultValue={editing?.content || ""} rows={8} className="mt-2 w-full rounded-xl border border-slate-200 p-4" placeholder="段落之間空一行"/></label>
          <label className="text-sm text-slate-600">封面圖片（修改時未選擇會保留原圖）<input name="image" type="file" accept="image/*" className="mt-2 block w-full rounded-xl border border-slate-200 p-3 text-sm"/></label>
        </>}

        {section === "gallery" && <>
          <label className="text-sm text-slate-600">活動介紹<textarea name="description" defaultValue={editing?.description || ""} rows={4} className="mt-2 w-full rounded-xl border border-slate-200 p-4"/></label>
          <label className="text-sm text-slate-600">排序<input name="order" type="number" min="1" defaultValue={editing?.order || 1} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-4"/></label>
          <label className="text-sm text-slate-600">活動照片{editing && "（未選擇會保留原圖）"}<input name="image" type="file" accept="image/*" required={!editing} className="mt-2 block w-full rounded-xl border border-slate-200 p-3 text-sm"/></label>
        </>}

        {section === "brochure" && <>
          {brochure?.pdfUrl && <a href={brochure.pdfUrl} target="_blank" rel="noreferrer" className="text-sm text-[#df0873] underline">查看目前簡章{brochure.fileName ? `：${brochure.fileName}` : ""}</a>}
          <label className="text-sm text-slate-600">PDF 檔案{brochure && "（未選擇會保留原檔）"}<input name="file" type="file" accept="application/pdf,.pdf" required={!brochure} className="mt-2 block w-full rounded-xl border border-slate-200 p-3 text-sm"/></label>
          <label className="flex items-center gap-3 text-sm text-slate-600"><input name="publish" type="checkbox" value="true" defaultChecked={brochure?.publish ?? true} className="h-5 w-5 accent-[#df0873]"/>顯示於網站</label>
        </>}

        <button disabled={saving} className="h-12 rounded-full bg-[#df0873] font-semibold text-white disabled:opacity-50">{saving ? "儲存中…" : "儲存內容"}</button>
      </form>
    </section>

    {section !== "brochure" && <section className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-xl font-bold text-slate-800">現有內容</h2>
      {loading ? <p className="mt-5 text-sm text-slate-500">載入中…</p> : items.length ? <div className="mt-5 space-y-3">{items.map((item) => <article key={item._id} className="flex flex-col gap-4 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex min-w-0 items-center gap-4">{item.imageUrl && <img src={item.imageUrl} alt="" className="h-16 w-16 flex-none rounded-xl object-cover"/>}<div className="min-w-0"><h3 className="font-semibold text-slate-800">{item.title}</h3><p className="mt-1 line-clamp-2 text-sm text-slate-500">{section === "news" ? `${categoryLabels[item.category || "school"]}・${item.summary || "尚未填寫摘要"}` : item.description || "尚未填寫介紹"}</p></div></div><button type="button" onClick={() => startEditing(item)} className="rounded-xl border border-pink-200 px-4 py-2 text-sm text-[#df0873]">修改</button></article>)}</div> : <p className="mt-5 text-sm text-slate-500">目前沒有內容。</p>}
    </section>}
  </div>;
}
