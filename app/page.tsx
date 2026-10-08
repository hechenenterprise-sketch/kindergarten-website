import Image from "next/image";
import Link from "next/link";
import {ArrowDown, ArrowUpRight, Phone, Sprout} from "lucide-react";
import MobileMenu from "@/components/MobileMenu";
import BackToTop from "@/components/BackToTop";
import Reveal from "@/components/Reveal";
import {NewsSection, GallerySection, TeachersSection} from "@/components/DeferredSections";
import {siteNavigation} from "@/lib/site-navigation";
import {publicSiteConfig} from "@/lib/site-mode";
import {client} from "@/sanity/lib/client";
import {aboutSettingsQuery, brochureQuery, contactSettingsQuery, coursesQuery, homeSettingsQuery} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";
import {GardenFlower, GardenSprig, GardenSun, StoryCurve} from "@/components/GardenDecor";
import "./miter.css";
import "./garden.css";

export const revalidate = 0;
type SanityImage = Parameters<typeof urlFor>[0];
type HomeSettings = {heroImage?: SanityImage; eyebrow?: string; title?: string; highlightTitle?: string; description?: string; primaryButtonText?: string};
type AboutSettings = {image?: SanityImage; eyebrow?: string; title?: string; description1?: string; description2?: string; experienceYears?: string; experienceLabel?: string; feature1Title?: string; feature1Description?: string; feature2Title?: string; feature2Description?: string; feature3Title?: string; feature3Description?: string; feature4Title?: string; feature4Description?: string};
type Course = {_id: string; title: string; age?: string; description?: string; image?: SanityImage};
type Contact = {address?: string; phone?: string; serviceHours?: string; lineUrl?: string; facebookUrl?: string; googleMapEmbedUrl?: string; description?: string};
type Brochure = {title?: string; pdfUrl?: string};

function formatMultilineText(value: string) {
  return value.replace(/\u3000/g, " ").split(/\r?\n/).map((line) => line.trim()).join("\n").trim();
}

function CirclePhoto({image, alt, className = "", priority = false}: {image?: SanityImage; alt: string; className?: string; priority?: boolean}) {
  return <div className={`circle-photo ${className}`}>
    {image ? <Image src={urlFor(image).width(800).height(800).fit("crop").auto("format").url()} alt={alt} fill sizes="(max-width: 700px) 60vw, 340px" priority={priority} /> : <div className="photo-placeholder" role="img" aria-label={`${alt}，照片佔位`}><span className="placeholder-caption">{alt}</span></div>}
  </div>;
}

export default async function Home() {
  // Hidden collections never enter the public page payload.
  const [home, about, courses, contact, brochure] = await Promise.all([
    client.fetch<HomeSettings | null>(homeSettingsQuery).catch(() => null),
    client.fetch<AboutSettings | null>(aboutSettingsQuery).catch(() => null),
    client.fetch<Course[]>(coursesQuery).catch(() => []),
    client.fetch<Contact | null>(contactSettingsQuery).catch(() => null),
    client.fetch<Brochure | null>(brochureQuery).catch(() => null),
  ]);
  const features = [
    {title: about?.feature1Title || "愛與陪伴", description: about?.feature1Description || "建立孩子安全感與自信心。"},
    {title: about?.feature2Title || "快樂探索", description: about?.feature2Description || "鼓勵孩子主動學習與探索世界。"},
    {title: about?.feature3Title || "安全環境", description: about?.feature3Description || "提供安心、舒適的學習空間。"},
    {title: about?.feature4Title || "專業師資", description: about?.feature4Description || "用耐心與專業陪伴孩子成長。"},
  ];
  return <main className="miter-site">
    <a className="skip-link" href="#main-content">跳至主要內容</a>
    <header className="miter-header"><div className="page-width header-inner">
      <Link href="/" className="brand" aria-label="米堤爾幼兒園首頁"><Image src="/miter-logo.png" alt="米堤爾幼兒園" width={150} height={90} priority /><span>米堤爾幼兒園<small>MITER KINDERGARTEN</small></span></Link>
      <nav className="desktop-nav" aria-label="主要選單">{siteNavigation.filter(item => item.href !== "#contact").map(item => <Link key={item.href} href={item.href} className={item.href === "#contact" ? "nav-contact" : undefined}>{item.label}{item.href === "#contact" && <ArrowUpRight size={15}/>}</Link>)}</nav><MobileMenu />
    </div></header>
    <section id="main-content" className="hero page-width"><StoryCurve variant="hero"/><GardenSun className="hero-sun"/><GardenFlower className="hero-flower"/><GardenSprig className="hero-leaf"/>
      <div className="hero-copy"><p className="eyebrow"><span className="tiny-dot"/>{home?.eyebrow || "MITER · A PLACE TO GROW"}</p>
        <h1>{home?.title || "陪伴孩子探索世界"}<span>{home?.highlightTitle || "快樂學習，自信成長"}</span></h1>
        <p className="hero-description">{home?.description || "我們提供溫暖、安全且充滿創意的學習環境，陪伴每一位孩子探索興趣、建立自信，留下珍貴而快樂的童年回憶。"}</p>
        <a href="#contact" className="pill-button">{home?.primaryButtonText || "立即預約參觀"}<ArrowUpRight size={18}/></a>
        <div className="hero-trust"><span><span aria-hidden="true">✓</span> 合法立案</span><span><span aria-hidden="true">✓</span> 專業幼教</span><span><span aria-hidden="true">✓</span> 安心成長</span></div>
      </div>
      <div className="hero-art"><svg className="growth-path" viewBox="0 0 520 520" fill="none" aria-hidden="true"><path d="M45 355C15 245 30 80 205 60S495 140 435 270S335 425 470 460"/><circle cx="205" cy="60" r="6"/><circle cx="435" cy="270" r="6"/></svg>
        <span className="art-note">讓好奇心，慢慢發芽。</span><GardenSprig className="photo-leaf"/><div className="orb orb-yellow"/><div className="orb orb-green"/>
        <CirclePhoto image={home?.heroImage} alt="米堤爾幼兒園的學習時光" className="hero-photo" priority/>
        <CirclePhoto image={about?.image} alt={about?.title || "認識米堤爾幼兒園"} className="hero-small-photo"/>
        <CirclePhoto image={courses.find(course => course.image)?.image} alt="探索的每一天" className="hero-third-photo"/><span className="art-caption">Every little moment<br/><em>matters.</em></span><span className="sparkle" aria-hidden="true">✳</span>
      </div>
      <a className="scroll-note" href="#about"><ArrowDown size={15}/> 往下，認識我們 <span>01 / 開始探索</span></a>
    </section>
    <NewsSection/>
    <div className="chapter-divider page-width"><span>陪伴</span><span className="divider-star">✳</span><span>探索</span><span className="divider-star">✳</span><span>成長</span><small>EVERY CHILD, THEIR OWN PACE.</small></div>
    <section id="about" className="about-section page-width"><StoryCurve variant="about"/><GardenFlower className="about-flower"/><GardenSprig className="about-leaf"/>
      <Reveal className="section-label"><span>01</span><p>{about?.eyebrow || "ABOUT MITER"}<small>關於米堤爾</small></p></Reveal>
      <div className="about-grid"><Reveal className="about-visual"><CirclePhoto image={about?.image} alt={about?.title || "認識米堤爾幼兒園"}/><div className="experience-note"><strong>{about?.experienceYears || "15+"}</strong><span>{about?.experienceLabel || "年幼教經驗"}</span></div><CirclePhoto image={courses.find(course => course.image)?.image} alt="愛與陪伴" className="about-detail-photo"/><p className="photo-caption">在愛與尊重中，找到自己的成長節奏。</p></Reveal>
        <Reveal className="about-copy"><h2>{about?.title || "認識米堤爾幼兒園"}</h2><p>{formatMultilineText(about?.description1 || "米堤爾幼兒園秉持著「陪伴、探索、成長」的教育理念，在充滿愛與尊重的環境中，陪伴孩子建立自信、培養良好的生活習慣，並透過多元課程激發創造力與學習興趣。")}</p><p>{formatMultilineText(about?.description2 || "我們相信，每位孩子都有屬於自己的成長節奏，老師扮演的是陪伴者與引導者，讓孩子在快樂中學習，在探索中成長。")}</p></Reveal></div>
      <Reveal className="values-grid">{features.map((feature, index) => <article key={index}><span className="value-number" aria-hidden="true">{["♡", "❧", "⌂", "✧"][index]}</span><h3>{feature.title}</h3><p>{feature.description}</p></article>)}</Reveal>
    </section>
    <section id="courses" className="courses-section"><div className="page-width"><StoryCurve variant="courses"/><GardenSprig className="course-leaf"/><GardenSun className="course-sun"/>
      <Reveal className="section-label"><span>02</span><p>LEARNING & EXPLORING<small>課程介紹</small></p></Reveal>
      <Reveal className="section-heading"><h2>多元課程設計<span>讓探索，成為日常。</span></h2><p>依照不同年齡規劃適合孩子發展的學習內容，讓孩子在遊戲中學習，在探索中成長。</p></Reveal>
      <div className="course-grid">{courses.length ? courses.map((course, index) => <Reveal key={course._id} className="course-item"><article><div className="course-image"><CirclePhoto image={course.image} alt={course.title}/><span className="course-index">{String(index + 1).padStart(2, "0")}</span></div><span className="age-tag">{course.age || "適齡課程"}</span><h3>{course.title}</h3><p>{course.description || "培養生活自理、社交互動與快樂學習能力。"}</p></article></Reveal>) : <p className="empty-content">課程資訊準備中，歡迎聯絡園所了解更多。</p>}</div>
    </div></section>
    <GallerySection/>
    <section id="enrollment" className="enrollment-section page-width"><GardenFlower className="enrollment-flower"/><Reveal className="enrollment-inner"><div><p className="eyebrow">03 / ENROLLMENT</p><h2>一起，翻開成長的下一頁。</h2><p>歡迎下載最新招生簡章，了解招生資訊、課程內容與入園方式。</p></div>{brochure?.pdfUrl ? <a href={brochure.pdfUrl} target="_blank" rel="noopener noreferrer" className="pill-button">{brochure.title || "下載招生簡章"}<ArrowUpRight size={18}/></a> : <a href="#contact" className="pill-button">洽詢招生資訊<ArrowUpRight size={18}/></a>}</Reveal></section>
    <TeachersSection/>
    <section id="contact" className="contact-section page-width"><GardenSprig className="contact-leaf"/><Reveal className="section-label"><span>04</span><p>COME SAY HELLO<small>聯絡我們</small></p></Reveal>
      <div className="contact-grid"><Reveal><h2>歡迎預約參觀<span>米堤爾幼兒園</span></h2><p className="contact-description">{contact?.description || "歡迎家長來電或透過 LINE 與我們聯絡，了解招生資訊、課程內容與可預約參觀的時段。"}</p><dl className="contact-details"><div><dt>園所地址</dt><dd>{contact?.address || "歡迎聯絡園所洽詢"}</dd></div><div><dt>聯絡電話</dt><dd>{contact?.phone ? <a href={`tel:${contact.phone}`}>{contact.phone}</a> : "歡迎聯絡園所洽詢"}</dd></div><div><dt>服務時間</dt><dd>{contact?.serviceHours || "週一至週五 08:00～17:30"}</dd></div></dl><div className="contact-actions">{contact?.phone && <a className="contact-icon phone-icon" href={`tel:${contact.phone}`} aria-label="電話諮詢" title="電話諮詢"><Phone size={21} aria-hidden="true"/></a>}{contact?.lineUrl && <a className="outline-button" href={contact.lineUrl} target="_blank" rel="noopener noreferrer">LINE 聯絡<ArrowUpRight size={16}/></a>}{contact?.facebookUrl && <a className="contact-icon facebook-icon" href={contact.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook"><svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true"><path d="M13.5 8.5V6.75c0-.84.56-1.04.96-1.04h2.44V2.1L13.54 2C9.85 2 9 4.76 9 6.52V8.5H6v4h3V22h4.5v-9.5h3l.4-4h-3.4Z"/></svg></a>}</div></Reveal>
        <Reveal className="map-panel">{contact?.googleMapEmbedUrl ? <iframe src={contact.googleMapEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="米堤爾幼兒園 Google 地圖"/> : <div className="map-placeholder"><Sprout size={45} strokeWidth={1}/><p>期待與你相見</p><span>歡迎聯絡園所預約參觀</span></div>}</Reveal></div>
    </section>
    <footer className="miter-footer"><div className="page-width"><Link href="/" aria-label="米堤爾幼兒園首頁"><Image src="/miter-logo.png" alt="米堤爾幼兒園" width={150} height={90}/></Link><div><p>© 2026 米堤爾幼兒園｜Website by HECHEN DIGITAL</p><small>{publicSiteConfig.informationNotice}</small></div><a href="#main-content" className="footer-top">回到開始 ↑</a></div></footer><BackToTop/>
  </main>;
}
