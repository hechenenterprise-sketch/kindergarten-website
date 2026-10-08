import Image from "next/image";
import Link from "next/link";
import {ArrowUpRight} from "lucide-react";
import GalleryLightbox from "@/components/GalleryLightbox";
import NewsCategoryBadge, {type NewsCategory} from "@/components/NewsCategoryBadge";
import Reveal from "@/components/Reveal";
import {isFullPreview, publicSiteConfig} from "@/lib/site-mode";
import {client} from "@/sanity/lib/client";
import {galleryQuery, latestNewsQuery, teachersQuery} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

type SanityImage = NonNullable<Parameters<typeof urlFor>[0]>;
type News = {_id: string; title: string; slug?: string; category?: NewsCategory; publishedAt?: string};
type Gallery = {_id: string; title: string; image?: SanityImage};
type Teacher = {_id: string; name: string; title?: string; description?: string; image?: SanityImage};

// Check visibility before fetching: disabled modules render no DOM or content payload.
export async function NewsSection() {
  if (!publicSiteConfig.showNews) return null;
  const news = await client.fetch<News[]>(latestNewsQuery).catch(() => []);
  return <section id="news" className="deferred-section page-width">
    <Reveal className="section-heading"><div><p className="eyebrow">LATEST NEWS</p><h2>最新消息</h2></div><Link className="social-link" href="/news">查看全部消息 <ArrowUpRight size={16}/></Link></Reveal>
    <Reveal className="news-list">{news.length ? news.map(item => <Link key={item._id} href={`/news/${encodeURIComponent(item.slug || item._id)}`} className="news-row"><NewsCategoryBadge category={item.category}/><h3>{item.title}</h3><time dateTime={item.publishedAt}>{item.publishedAt && Number.isFinite(Date.parse(item.publishedAt)) ? new Intl.DateTimeFormat("zh-TW", {timeZone: "Asia/Taipei"}).format(new Date(item.publishedAt)) : ""}</time><ArrowUpRight size={17}/></Link>) : isFullPreview ? <div><p className="preview-example-note">以下為版型示意，非正式公告。</p>{["招生資訊", "園所活動", "園務公告"].map((title, index) => <article key={title} className="preview-sample-row"><NewsCategoryBadge category={index === 1 ? "activity" : "school"}/><h3>{title} · 消息標題位置</h3><span>日期位置</span></article>)}</div> : <p className="empty-content">目前尚無最新消息</p>}</Reveal>
  </section>;
}

export async function GallerySection() {
  if (!publicSiteConfig.showGallery) return null;
  const gallery = await client.fetch<Gallery[]>(galleryQuery).catch(() => []);
  const images = gallery.flatMap(item => item.image ? [{src: urlFor(item.image).width(1200).height(900).auto("format").url(), title: item.title}] : []);
  return <section id="gallery" className="deferred-section page-width"><Reveal><p className="eyebrow">ACTIVITY GALLERY</p><h2>活動相簿</h2><p className="deferred-description">記錄孩子在課堂、節慶與戶外活動中的快樂時光。</p></Reveal>{images.length ? <GalleryLightbox images={images}/> : isFullPreview ? <div><p className="preview-example-note">相簿版型示意，照片與標題待補。</p><div className="preview-gallery-grid">{[1, 2, 3].map(index => <article key={index}><div className="preview-photo-slot">照片位置</div><h3>活動相簿 {index}</h3></article>)}</div></div> : <p className="empty-content">目前尚未建立活動相簿</p>}</section>;
}

export async function TeachersSection() {
  if (!publicSiteConfig.showTeachers) return null;
  const teachers = await client.fetch<Teacher[]>(teachersQuery).catch(() => []);
  return <section id="teachers" className="deferred-section page-width"><Reveal><p className="eyebrow">OUR TEACHERS</p><h2>師資團隊</h2></Reveal><div className="teacher-grid">{teachers.length ? teachers.map(teacher => <Reveal key={teacher._id}><article>{teacher.image && <div className="circle-photo"><Image src={urlFor(teacher.image).width(600).height(600).fit("crop").auto("format").url()} alt={teacher.name} fill sizes="(max-width: 800px) 40vw, 250px"/></div>}<h3>{teacher.name}</h3><span>{teacher.title}</span><p>{teacher.description}</p></article></Reveal>) : isFullPreview ? <>{[1, 2, 3, 4].map(index => <Reveal key={index}><article><div className="preview-photo-slot">教師照片位置</div><h3>教師姓名位置</h3><span>職稱位置 · 版型示意</span><p>這裡預留教師的教學理念、專長與陪伴孩子成長的介紹。</p></article></Reveal>)}</> : <p className="empty-content">師資資訊準備中</p>}</div></section>;
}
