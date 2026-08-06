import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Heart,
  Menu,
  Palette,
  Sprout,
} from "lucide-react";

import {client} from "@/sanity/lib/client";
import {latestNewsQuery} from "@/sanity/lib/queries";

type NewsItem = {
  _id: string;
  title: string;
  slug?: string;
  publishedAt?: string;
  summary?: string;
};

const features = [
  {
    title: "小班制教學",
    description: "重視每位孩子的個別需求，給予細心且充足的陪伴。",
    icon: Heart,
  },
  {
    title: "多元特色課程",
    description: "結合藝術、音樂、體能與生活探索，培養多元能力。",
    icon: Palette,
  },
  {
    title: "自然探索學習",
    description: "帶領孩子親近自然，在觀察與實作中快樂成長。",
    icon: Sprout,
  },
  {
    title: "專業師資團隊",
    description: "由具備幼教專業與愛心的老師陪伴孩子每一天。",
    icon: BookOpen,
  },
];

export default async function Home() {
  const newsItems = await client.fetch<NewsItem[]>(latestNewsQuery);
  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-800">
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
  <Image
    src="/miter-logo.jpg"
    alt="米堤爾幼兒園 Miter Kindergarten"
    width={150}
    height={90}
    priority
    className="h-16 w-auto object-contain"
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

  <Link
    href="#contact"
    className="inline-flex h-10 items-center justify-center rounded-full bg-[#df0873] px-6 text-sm font-medium text-white transition hover:bg-[#c80767]"
  >
    預約參觀
  </Link>
</nav>

          <button
            type="button"
            aria-label="開啟選單"
            className="rounded-xl border border-orange-100 p-2 lg:hidden"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <section className="relative min-h-[500px] overflow-hidden">
  <Image
    src="/images/hero/hero-1.jpg"
    alt="米堤爾幼兒園校園生活"
    fill
    priority
    className="object-cover object-center"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/75 via-slate-900/45 to-transparent" />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent" />

  <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-5 py-16 lg:px-8">
    <div className="max-w-3xl text-white">
      <span className="inline-flex rounded-full border border-white/30 bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur-md">
        米堤爾幼兒園｜Miter Kindergarten
      </span>

      <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        陪伴孩子探索世界
        <span className="mt-2 block text-pink-300">
          快樂學習，自信成長
        </span>
      </h1>

      <p className="mt-7 max-w-2xl text-base leading-8 text-white/85 sm:text-lg">
        我們提供溫暖、安全且充滿創意的學習環境，陪伴每一位孩子探索興趣、建立自信，留下珍貴而快樂的童年回憶。
      </p>

      <div className="mt-9 flex flex-wrap gap-4">
        <Link
          href="#contact"
          className="inline-flex h-13 items-center justify-center rounded-full bg-[#df0873] px-8 text-base font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:bg-[#c80767]"
        >
          立即預約參觀
        </Link>

        <Link
          href="#about"
          className="inline-flex h-13 items-center justify-center rounded-full border border-white/50 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur-md transition hover:bg-white hover:text-slate-900"
        >
          認識米堤爾
        </Link>
      </div>

      <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/85">
        <span>✓ 合格立案幼兒園</span>
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

    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold tracking-widest text-[#df0873]">
          LATEST NEWS
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          最新消息
        </h2>
      </div>

      <Link
        href="#news"
        className="font-semibold text-[#df0873] hover:underline"
      >
        查看全部 →
      </Link>
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

  </div>
</section>

<section id="about" className="bg-white py-24">
  <div className="mx-auto grid max-w-7xl gap-16 px-5 lg:grid-cols-2 lg:px-8">

    <div className="relative">
      <div className="overflow-hidden rounded-[40px] shadow-2xl">
        <Image
          src="/images/hero/hero-2.jpg"
          alt="米堤爾幼兒園"
          width={800}
          height={700}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="absolute -bottom-8 -right-6 rounded-3xl bg-white p-7 shadow-xl">
        <p className="text-4xl font-bold text-[#df0873]">
          15+
        </p>

        <p className="mt-1 text-sm text-slate-500">
          年幼教經驗
        </p>
      </div>
    </div>

    <div className="flex flex-col justify-center">
      <p className="font-semibold tracking-widest text-[#df0873]">
        ABOUT MITER
      </p>

      <h2 className="mt-3 text-4xl font-bold leading-tight">
        認識米堤爾幼兒園
      </h2>

      <p className="mt-7 leading-8 text-slate-600">
        米堤爾幼兒園秉持著「陪伴、探索、成長」的教育理念，
        在充滿愛與尊重的環境中，
        陪伴孩子建立自信、培養良好的生活習慣，
        並透過多元課程激發創造力與學習興趣。
      </p>

      <p className="mt-5 leading-8 text-slate-600">
        我們相信，
        每位孩子都有屬於自己的成長節奏，
        老師扮演的是陪伴者與引導者，
        讓孩子在快樂中學習，
        在探索中成長。
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">

        <div className="rounded-2xl bg-pink-50 p-6">
          <p className="text-3xl font-bold text-[#df0873]">
            ❤️
          </p>

          <h3 className="mt-4 text-lg font-bold">
            愛與陪伴
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            建立孩子安全感與自信心。
          </p>
        </div>

        <div className="rounded-2xl bg-pink-50 p-6">
          <p className="text-3xl font-bold text-[#df0873]">
            🌱
          </p>

          <h3 className="mt-4 text-lg font-bold">
            快樂探索
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600">
            鼓勵孩子主動學習與探索世界。
          </p>
        </div>

      </div>

 
 </div>

  </div>
</section>

<section id="courses"className="bg-[#fff9fc] py-24">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">

    <div className="text-center">
      <p className="font-semibold tracking-widest text-[#df0873]">
        OUR COURSES
      </p>

      <h2 className="mt-3 text-4xl font-bold">
        多元課程設計
      </h2>

      <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-600">
        依照不同年齡規劃適合孩子發展的學習內容，
        讓孩子在遊戲中學習，在探索中成長。
      </p>
    </div>

    <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">

      {[
        {
          title: "幼幼班",
          age: "2-3歲",
          image: "/images/hero/hero-1.jpg",
          color: "bg-pink-100",
        },
        {
          title: "小班",
          age: "3-4歲",
          image: "/images/hero/hero-2.jpg",
          color: "bg-yellow-100",
        },
        {
          title: "中班",
          age: "4-5歲",
          image: "/images/hero/hero-3.jpg",
          color: "bg-green-100",
        },
        {
          title: "大班",
          age: "5-6歲",
          image: "/images/hero/hero-1.jpg",
          color: "bg-blue-100",
        },
      ].map((course) => (

        <article
        key={course.title}
  className="w-[260px] overflow-hidden rounded-[28px] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
>

          <div className="relative h-48 overflow-hidden">

            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover transition duration-500 hover:scale-110"
            />

          </div>

          <div className="p-5">

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-semibold ${course.color}`}
            >
              {course.age}
            </span>

            <h3 className="mt-4 text-xl font-bold">
              {course.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
  培養生活自理、
  社交互動與快樂學習能力。
</p>

          </div>

        </article>

      ))}

    </div>

  </div>
</section>

      <section id="gallery" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="font-semibold text-[#df0873]">ACTIVITY GALLERY</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                活動相簿
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                記錄孩子在課堂、節慶與戶外活動中的快樂時光。
              </p>
            </div>

            <Link
              href="#gallery"
              className="font-semibold text-[#df0873] transition hover:opacity-70"
            >
              查看更多活動 →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
  {
    title: "創意美術課",
    image: "/images/hero/hero-1.jpg",
  },
  {
    title: "戶外探索",
    image: "/images/hero/hero-2.jpg",
  },
  {
    title: "節慶活動",
    image: "/images/hero/hero-3.jpg",
  },
].map((item) => (
  <article
    key={item.title}
    className="overflow-hidden rounded-[28px] bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition duration-500 hover:scale-110"
      />
    </div>

    <div className="p-6">
      <h3 className="text-xl font-bold">{item.title}</h3>

      <p className="mt-2 text-slate-500">
        紀錄孩子每一天快樂學習的精彩時刻。
      </p>
    </div>
  </article>
))}

</div>
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
      {[
        {
          name: "王老師",
          title: "園長",
          image: "/images/hero/hero-1.jpg",
          description: "具備豐富園務與幼教經驗，用愛陪伴孩子成長。",
        },
        {
          name: "李老師",
          title: "幼幼班老師",
          image: "/images/hero/hero-2.jpg",
          description: "重視孩子的安全感、生活常規與情緒表達。",
        },
        {
          name: "陳老師",
          title: "小班老師",
          image: "/images/hero/hero-3.jpg",
          description: "透過遊戲與團體活動，培養探索及互動能力。",
        },
        {
          name: "林老師",
          title: "中班老師",
          image: "/images/hero/hero-1.jpg",
          description: "引導孩子發展語言、創意與生活自理能力。",
        },
        {
          name: "黃老師",
          title: "大班老師",
          image: "/images/hero/hero-2.jpg",
          description: "協助孩子建立自主學習與國小銜接能力。",
        },
        {
          name: "張老師",
          title: "才藝課老師",
          image: "/images/hero/hero-3.jpg",
          description: "透過藝術、音樂與律動，啟發孩子的創造力。",
        },

        // 重複一份，讓輪播可以無縫循環
        {
          name: "王老師",
          title: "園長",
          image: "/images/hero/hero-1.jpg",
          description: "具備豐富園務與幼教經驗，用愛陪伴孩子成長。",
        },
        {
          name: "李老師",
          title: "幼幼班老師",
          image: "/images/hero/hero-2.jpg",
          description: "重視孩子的安全感、生活常規與情緒表達。",
        },
        {
          name: "陳老師",
          title: "小班老師",
          image: "/images/hero/hero-3.jpg",
          description: "透過遊戲與團體活動，培養探索及互動能力。",
        },
        {
          name: "林老師",
          title: "中班老師",
          image: "/images/hero/hero-1.jpg",
          description: "引導孩子發展語言、創意與生活自理能力。",
        },
        {
          name: "黃老師",
          title: "大班老師",
          image: "/images/hero/hero-2.jpg",
          description: "協助孩子建立自主學習與國小銜接能力。",
        },
        {
          name: "張老師",
          title: "才藝課老師",
          image: "/images/hero/hero-3.jpg",
          description: "透過藝術、音樂與律動，啟發孩子的創造力。",
        },
      ].map((teacher, index) => (
        <article
          key={`${teacher.name}-${index}`}
          className="teacher-card overflow-hidden rounded-[28px] bg-white shadow-lg"
        >
          <div className="relative h-64 overflow-hidden">
            <Image
              src={teacher.image}
              alt={teacher.name}
              fill
              className="object-cover transition duration-500 hover:scale-105"
            />
          </div>

          <div className="p-6 text-center">
            <h3 className="text-xl font-bold">{teacher.name}</h3>

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

      <section id="contact" className="bg-white py-24">
  <div className="mx-auto max-w-7xl px-5 lg:px-8">
    <div className="grid gap-12 lg:grid-cols-2 lg:items-stretch">

      <div className="rounded-[36px] bg-[#fff9fc] p-8 sm:p-10">
        <p className="font-semibold tracking-widest text-[#df0873]">
          CONTACT US
        </p>

        <h2 className="mt-3 text-4xl font-bold leading-tight">
          歡迎預約參觀
          <span className="mt-2 block text-[#df0873]">
            米堤爾幼兒園
          </span>
        </h2>

        <p className="mt-6 max-w-xl leading-8 text-slate-600">
          歡迎家長來電或透過 LINE 與我們聯絡，
          了解招生資訊、課程內容與可預約參觀的時段。
        </p>

        <div className="mt-8 space-y-5">
          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-[#df0873]">
              園所地址
            </p>
            <p className="mt-2 leading-7 text-slate-700">
              之後填入米堤爾幼兒園正式地址
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-[#df0873]">
              聯絡電話
            </p>
            <p className="mt-2 leading-7 text-slate-700">
              之後填入正式聯絡電話
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-[#df0873]">
              服務時間
            </p>
            <p className="mt-2 leading-7 text-slate-700">
              週一至週五 08:00～17:30
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="tel:"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#df0873] px-8 font-semibold text-white transition hover:-translate-y-1 hover:bg-[#c80767]"
          >
            電話諮詢
          </a>

          <a
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full border border-pink-200 bg-white px-8 font-semibold text-[#df0873] transition hover:-translate-y-1 hover:bg-pink-50"
          >
            LINE 聯絡
          </a>

          <a
            href="#"
            className="inline-flex h-12 items-center justify-center rounded-full border border-pink-200 bg-white px-8 font-semibold text-slate-700 transition hover:-translate-y-1 hover:bg-pink-50"
          >
            Facebook
          </a>
        </div>
      </div>

      <div className="min-h-[520px] overflow-hidden rounded-[36px] border border-pink-100 bg-gradient-to-br from-pink-100 via-white to-purple-100 shadow-lg">
        <div className="flex h-full min-h-[520px] items-center justify-center p-8 text-center">
          <div>
            <div className="text-7xl">📍</div>

            <h3 className="mt-6 text-2xl font-bold">
              Google 地圖
            </h3>

            <p className="mt-3 max-w-md leading-7 text-slate-600">
              取得園所正式地址後，
              這裡會直接嵌入可放大、導航的 Google 地圖。
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>

      <footer className="bg-slate-900 py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 md:flex-row md:items-center lg:px-8">
          <div>
            <p className="text-xl font-bold text-pink-300">米堤爾幼兒園</p>
            <p className="mt-1 text-sm text-slate-400">
              Miter Kindergarten
            </p>
          </div>

          <p className="text-sm text-slate-400">
            © 2026 米堤爾幼兒園 All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}