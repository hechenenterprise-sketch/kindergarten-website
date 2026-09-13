import Image from "next/image";
import Link from "next/link";
import MobileMenu from "../components/MobileMenu";
import GalleryLightbox from "../components/GalleryLightbox";
import BackToTop from "../components/BackToTop";

export const revalidate = 0;

import {client} from "@/sanity/lib/client";
import {
  aboutSettingsQuery,
  brochureQuery,
  contactSettingsQuery,
  coursesQuery,
  galleryQuery,
  homeSettingsQuery,
  latestNewsQuery,
  teachersQuery,
} from "@/sanity/lib/queries";

import {urlFor} from "@/sanity/lib/image";

type NewsItem = {
  _id: string;
  title: string;
  slug?: string;
  publishedAt?: string;
  summary?: string;
};

type CourseItem = {
  _id: string;
  title: string;
  age?: string;
  description?: string;
  image?: unknown;
  order?: number;
};

type AboutSettings = {
  image?: unknown;
  eyebrow?: string;
  title?: string;
  description1?: string;
  description2?: string;
  experienceYears?: string;
  experienceLabel?: string;
  feature1Title?: string;
  feature1Description?: string;
  feature2Title?: string;
  feature2Description?: string;
};

type ContactSettings = {
  address?: string;
  phone?: string;
  serviceHours?: string;
  lineUrl?: string;
  facebookUrl?: string;
  googleMapEmbedUrl?: string;
  description?: string;
};

type GalleryItem = {
  _id: string;
  title: string;
  description?: string;
  image?: unknown;
  order?: number;
};

type TeacherItem = {
  _id: string;
  name: string;
  title?: string;
  description?: string;
  image?: unknown;
};

type Brochure = {
  title?: string;
  pdfUrl?: string;
};

export default async function Home() {
  const [newsItems, home, about, courses, teachers, gallery, contact, brochure] =
  await Promise.all([
    client.fetch<NewsItem[]>(latestNewsQuery).catch(() => []),
    client.fetch(homeSettingsQuery).catch(() => null),
    client.fetch<AboutSettings>(aboutSettingsQuery).catch(() => null),
    client.fetch<CourseItem[]>(coursesQuery).catch(() => []),
    client.fetch<TeacherItem[]>(teachersQuery).catch(() => []),
    client.fetch<GalleryItem[]>(galleryQuery).catch(() => []),
    client
      .fetch<ContactSettings>(contactSettingsQuery)
      .catch(() => null),
    client.fetch<Brochure>(brochureQuery).catch(() => null),
  ]);

  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-800">
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
  <Image
    src="/miter-logo.png"
    alt="米堤爾幼兒園 Miter Kindergarten"
    width={150}
    height={90}
    priority
    className="h-10 w-auto object-contain sm:h-14"
  />

  <div className="hidden sm:block">
    <p className="text-lg font-bold tracking-wide text-[#df0873]">
      米堤爾幼兒園
    </p>
    <p className="text-xs text-slate-500">Miter Kindergarten</p>
  </div>
</Link>

          <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
  <Link className="transition hover:text-[#df0873]" href="/">
    首頁
  </Link>

  <Link className="transition hover:text-[#df0873]" href="#news">
    最新消息
  </Link>

  <Link className="transition hover:text-[#df0873]" href="#about">
    關於我們
  </Link>

  <Link className="transition hover:text-[#df0873]" href="#courses">
    課程介紹
  </Link>

  <Link className="transition hover:text-[#df0873]" href="#gallery">
    活動相簿
  </Link>

  <Link className="transition hover:text-[#df0873]" href="#teachers">
    師資團隊
  </Link>

  <Link className="transition hover:text-[#df0873]" href="#contact">
    聯絡我們
  </Link>

  <Link className="transition hover:text-[#df0873]" href="/login">
  園務登入
</Link>
</nav>
<MobileMenu />
        </div>
      </header>

      <section className="relative min-h-[390px] overflow-hidden sm:min-h-[420px]">
  <Image
  src={
    home?.heroImage
      ? urlFor(home.heroImage).width(2000).url()
      : "/images/hero/hero-1.jpg"
  }
  sizes="100vw"
  alt="米堤爾幼兒園"
  fill
  priority
  className="object-cover"
/>

  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

  <div className="relative mx-auto flex min-h-[390px] max-w-7xl items-center px-4 py-10 sm:min-h-[420px] sm:px-5 sm:py-12 lg:px-8">
    <div className="max-w-3xl text-white">


      <h1 className="mt-2 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
  {home?.title || "陪伴孩子探索世界"}
        <span className="mt-2 block text-pink-300">
    {home?.highlightTitle || "快樂學習，自信成長"}
  </span>
</h1>

      <p className="mt-6 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
  {home?.description ||
    "我們提供溫暖、安全且充滿創意的學習環境，陪伴每一位孩子探索興趣、建立自信，留下珍貴而快樂的童年回憶。"}
</p>

      <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:gap-4">
        <Link
          href="#contact"
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#df0873] px-8 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#c80767] sm:w-auto"
        >
          {home?.primaryButtonText || "立即預約參觀"}
        </Link>

        <Link
          href="#about"
          className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900 sm:w-auto"
        >
          {home?.secondaryButtonText || "認識米堤爾"}
        </Link>
      </div>

      <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 text-xs text-white/85 sm:mt-10 sm:gap-x-7 sm:gap-y-3 sm:text-sm">
        <span>✓ 合法立案幼兒園</span>
        <span>✓ 專業幼教師資</span>
        <span>✓ 安全學習環境</span>
      </div>
    </div>
  </div>

  <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
    <button
      type="button"
      aria-label="第一張輪播圖片"
      className="h-2.5 w-8 rounded-full bg-white"
    />
    <button
      type="button"
      aria-label="第二張輪播圖片"
      className="size-2.5 rounded-full bg-white/50"
    />
    <button
      type="button"
      aria-label="第三張輪播圖片"
      className="size-2.5 rounded-full bg-white/50"
    />
 </div>
</section>

<section id="news" className="bg-[#fff9fc] py-16">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">

    <div className="text-center">
  <p className="font-semibold tracking-widest text-[#df0873]">
    LATEST NEWS
  </p>

  <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
    最新消息
  </h2>

  <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
    掌握招生資訊、活動消息與園務公告。
  </p>
</div>

    <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-md">

      {newsItems.length > 0 ? (

        newsItems.map((news) => (

          <Link
            key={news._id}
            href={news.slug ? `/news/${news.slug}` : "#"}
            className="flex flex-col gap-3 border-b border-pink-100 px-8 py-6 transition hover:bg-pink-50 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-4">

              <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-[#df0873]">
                公告
              </span>

              <p className="text-lg font-semibold">
                {news.title}
              </p>

            </div>

            <time className="text-sm text-slate-500">
              {news.publishedAt
                ? new Intl.DateTimeFormat("zh-TW").format(
                    new Date(news.publishedAt)
                  )
                : ""}
            </time>

          </Link>

        ))

      ) : (

        <div className="px-8 py-10 text-center text-slate-500">
          目前尚無最新消息
        </div>

      )}

    </div>
    <div className="mt-8 text-center">
      <Link
        href="/news"
        className="font-semibold text-[#df0873] transition hover:opacity-70"
      >
        查看全部消息 →
      </Link>
    </div>

  </div>
</section>

<section id="about" className="bg-white py-20">
  <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-2 lg:px-8">
    <div className="relative">
      <div className="relative min-h-[430px] overflow-hidden rounded-[36px] shadow-xl">
        <Image
  src={
    about?.image
      ? urlFor(about.image).width(1000).height(800).url()
      : "/images/hero/hero-2.jpg"
  }
  alt={about?.title || "認識米堤爾幼兒園"}
  fill
  sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover"
/>
      </div>

      <div className="absolute -bottom-6 -right-4 rounded-3xl bg-white px-6 py-5 shadow-xl sm:right-4">
        <p className="text-3xl font-bold text-[#df0873]">
          {about?.experienceYears || "15+"}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {about?.experienceLabel || "年幼教經驗"}
        </p>
      </div>
    </div>

    <div className="flex flex-col justify-center">
      <p className="font-semibold tracking-widest text-[#df0873]">
        {about?.eyebrow || "ABOUT MITER"}
      </p>

      <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
        {about?.title || "認識米堤爾幼兒園"}
      </h2>

      <p className="mt-6 leading-8 text-slate-600">
        {about?.description1 ||
          "米堤爾幼兒園秉持著「陪伴、探索、成長」的教育理念，在充滿愛與尊重的環境中，陪伴孩子建立自信、培養良好的生活習慣，並透過多元課程激發創造力與學習興趣。"}
      </p>

      <p className="mt-4 leading-8 text-slate-600">
        {about?.description2 ||
          "我們相信，每位孩子都有屬於自己的成長節奏，老師扮演的是陪伴者與引導者，讓孩子在快樂中學習，在探索中成長。"}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-pink-50 p-5">
          <p className="text-2xl">❤️</p>

          <h3 className="mt-3 text-lg font-bold">
            {about?.feature1Title || "愛與陪伴"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {about?.feature1Description ||
              "建立孩子安全感與自信心。"}
          </p>
        </div>

        <div className="rounded-2xl bg-pink-50 p-5">
          <p className="text-2xl">🌱</p>

          <h3 className="mt-3 text-lg font-bold">
            {about?.feature2Title || "快樂探索"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {about?.feature2Description ||
              "鼓勵孩子主動學習與探索世界。"}
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<section id="courses" className="bg-[#fff9fc] py-20">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="text-center">
      <p className="font-semibold tracking-widest text-[#df0873]">
        OUR COURSES
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        多元課程設計
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
        依照不同年齡規劃適合孩子發展的學習內容，
        讓孩子在遊戲中學習，在探索中成長。
      </p>
    </div>

    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
  {courses.length > 0 ? (
    courses.map((course, index) => {
      const fallbackImages = [
        "/images/hero/hero-1.jpg",
        "/images/hero/hero-2.jpg",
        "/images/hero/hero-3.jpg",
        "/images/hero/hero-1.jpg",
      ];

      const tagColors = [
        "bg-pink-100",
        "bg-yellow-100",
        "bg-green-100",
        "bg-blue-100",
      ];

      return (
        <article
          key={course._id}
          className="overflow-hidden rounded-[28px] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <div className="relative h-48 overflow-hidden">
            <Image
  src={
    course.image
      ? urlFor(course.image).width(900).height(600).url()
      : fallbackImages[index % fallbackImages.length]
  }
  alt={course.title}
  fill
  sizes="(max-width:768px) 50vw, 25vw"
  className="object-cover transition duration-500 hover:scale-110"
/>
          </div>

          <div className="p-5">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                tagColors[index % tagColors.length]
              }`}
            >
              {course.age || "適齡課程"}
            </span>

            <h3 className="mt-4 text-xl font-bold">
              {course.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {course.description ||
                "培養生活自理、社交互動與快樂學習能力。"}
            </p>
          </div>
        </article>
      );
    })
  ) : (
    <div className="col-span-full rounded-3xl border border-dashed border-pink-200 bg-white p-10 text-center text-slate-500">
      目前尚未建立課程內容
    </div>
  )}
</div>
</div>
</section>

      <section id="gallery" className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="text-center">
      <p className="font-semibold tracking-widest text-[#df0873]">
        ACTIVITY GALLERY
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        活動相簿
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
        記錄孩子在課堂、節慶與戶外活動中的快樂時光。
      </p>
    </div>

    {gallery.length > 0 ? (
      <GalleryLightbox
        images={gallery.map((item) => ({
          src: item.image
            ? urlFor(item.image).width(1200).height(900).url()
            : "/images/hero/hero-1.jpg",
          title: item.title,
        }))}
      />
    ) : (
      <div className="mt-10 rounded-3xl border border-dashed border-pink-200 bg-white p-10 text-center text-slate-500">
        目前尚未建立活動相簿
      </div>
    )}

    <div className="mt-8 text-center">
      <Link
        href="#gallery"
        className="font-semibold text-[#df0873] transition hover:opacity-70"
      >
        查看更多活動 →
      </Link>
    </div>
  </div>
</section>

<section className="bg-[#fff9fc] py-20">
  <div className="mx-auto max-w-5xl px-5 text-center">

    <p className="font-semibold tracking-widest text-[#df0873]">
      ENROLLMENT
    </p>

    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
      招生簡章
    </h2>

    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
      歡迎下載最新招生簡章，了解招生資訊、課程內容與入園方式。
    </p>

    {brochure?.pdfUrl ? (
      <a
        href={brochure.pdfUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-[#df0873] px-8 font-semibold text-white transition hover:bg-[#c80767]"
      >
        📄 {brochure.title || "下載招生簡章"}
      </a>
    ) : (
      <p className="mt-10 text-slate-500">
        目前尚未提供招生簡章
      </p>
    )}

  </div>
</section>

<section id="teachers" className="overflow-hidden bg-[#fff9fc] py-20">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="text-center">
      <p className="font-semibold tracking-widest text-[#df0873]">
        OUR TEACHERS
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        專業師資團隊
      </h2>

      <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
        用專業、耐心與愛心，陪伴每一位孩子快樂學習、自信成長。
      </p>
    </div>
  </div>

  <div className="teacher-marquee mt-12">
    <div className="teacher-marquee-track">

      {teachers.map((teacher) => (

        <article
          key={teacher._id}
          className="teacher-card overflow-hidden rounded-[28px] bg-white shadow-lg"
        >
          <div className="relative h-64 overflow-hidden">

            <Image
  src={
    teacher.image
      ? urlFor(teacher.image).width(600).height(700).url()
      : "/images/hero/hero-1.jpg"
  }
  alt={teacher.name}
  fill
  sizes="320px"
  className="object-cover"
/>

          </div>

          <div className="p-6 text-center">

            <h3 className="text-xl font-bold">
              {teacher.name}
            </h3>

            <p className="mt-1 font-semibold text-[#df0873]">
              {teacher.title}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {teacher.description}
            </p>

          </div>

        </article>

      ))}

    </div>
  </div>
</section>

      <section id="contact" className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
      <div className="rounded-[32px] bg-[#fff9fc] p-7 sm:p-9">
        <p className="font-semibold tracking-widest text-[#df0873]">
          CONTACT US
        </p>

        <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">
          歡迎預約參觀
          <span className="mt-2 block text-[#df0873]">
            米堤爾幼兒園
          </span>
        </h2>

        <p className="mt-5 max-w-xl leading-7 text-slate-600">
          {contact?.description ||
            "歡迎家長來電或透過 LINE 與我們聯絡，了解招生資訊、課程內容與可預約參觀的時段。"}
        </p>

        <div className="mt-7 space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#df0873]">
              園所地址
            </p>
            <p className="mt-1.5 leading-7 text-slate-700">
              {contact?.address || "尚未設定園所地址"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#df0873]">
              聯絡電話
            </p>
            <p className="mt-1.5 leading-7 text-slate-700">
              {contact?.phone || "尚未設定聯絡電話"}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-[#df0873]">
              服務時間
            </p>
            <p className="mt-1.5 leading-7 text-slate-700">
              {contact?.serviceHours || "週一至週五 08:00～17:30"}
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          {contact?.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#df0873] px-7 font-semibold text-white transition hover:bg-[#c80767]"
            >
              電話諮詢
            </a>
          )}

          {contact?.lineUrl && (
            <a
              href={contact.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-pink-200 bg-white px-7 font-semibold text-[#df0873] transition hover:bg-pink-50"
            >
              LINE 聯絡
            </a>
          )}

          {contact?.facebookUrl && (
            <a
              href={contact.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-pink-200 bg-white px-7 font-semibold text-slate-700 transition hover:bg-pink-50"
            >
              Facebook
            </a>
          )}
        </div>
      </div>

      <div className="min-h-[420px] overflow-hidden rounded-[32px] border border-pink-100 bg-[#fff9fc] shadow-lg">
        {contact?.googleMapEmbedUrl ? (
          <iframe
            src={contact.googleMapEmbedUrl}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[420px] w-full border-0"
            title="米堤爾幼兒園 Google 地圖"
          />
        ) : (
          <div className="flex min-h-[420px] items-center justify-center p-8 text-center">
            <div>
              <div className="text-6xl">📍</div>
              <h3 className="mt-5 text-2xl font-bold">
                Google 地圖
              </h3>
              <p className="mt-3 text-slate-500">
                從後台填入 Google Maps 嵌入網址後，
                地圖就會顯示在這裡。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</section>

      <footer className="bg-gray-50 border-t border-gray-200 py-8">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row lg:px-8">

    <Link href="/" className="flex items-center gap-3">
      <Image
        src="/miter-logo.png"
        alt="米堤爾幼兒園"
        width={220}
        height={110}
        className="h-32 w-auto object-contain"
      />
    </Link>

    <div className="text-center md:text-right">
      <p className="text-sm text-slate-600">
        © 2026 米堤爾幼兒園 All Rights Reserved.
      </p>

      <Link
        href="/login"
        className="mt-2 inline-block text-xs text-slate-400 hover:text-[#df0873]"
      >
        園務登入
      </Link>
    </div>

  </div>
</footer>

<BackToTop />

</main>
);
}
