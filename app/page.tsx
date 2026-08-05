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
            <Link className="transition hover:text-orange-500" href="/">
              首頁
            </Link>

            <Link
              className="transition hover:text-orange-500"
              href="#about"
            >
              關於我們
            </Link>

            <Link
              className="transition hover:text-orange-500"
              href="#courses"
            >
              課程介紹
            </Link>

            <Link
              className="transition hover:text-orange-500"
              href="#news"
            >
              最新消息
            </Link>

            <Link
              className="transition hover:text-orange-500"
              href="#contact"
            >
              聯絡我們
            </Link>

            <Link
              href="#contact"
              className="inline-flex h-10 items-center justify-center rounded-full bg-orange-400 px-6 text-sm font-medium text-white transition hover:bg-orange-500"
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

      <section className="relative overflow-hidden">
        <div className="absolute -left-20 top-20 size-72 rounded-full bg-yellow-200/50 blur-3xl" />
        <div className="absolute -right-24 bottom-10 size-80 rounded-full bg-emerald-200/50 blur-3xl" />

        <div className="relative mx-auto grid min-h-[650px] max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
              陪伴孩子探索世界、快樂成長
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-slate-800 sm:text-5xl lg:text-6xl">
              在愛與陪伴中，
              <span className="mt-2 block text-orange-500">
                開啟學習的每一天
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              我們用溫暖、安全且充滿創意的學習環境，陪伴每一位孩子探索興趣、建立自信，留下快樂的童年回憶。
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#contact"
                className="inline-flex h-12 items-center justify-center rounded-full bg-orange-400 px-8 text-base font-medium text-white transition hover:bg-orange-500"
              >
                立即預約參觀
              </Link>

              <Link
                href="#about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-orange-200 bg-white px-8 text-base font-medium transition hover:bg-orange-50"
              >
                認識我們
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
              <span>✓ 合格立案</span>
              <span>✓ 專業幼教師資</span>
              <span>✓ 安全學習環境</span>
            </div>
          </div>

          <div className="relative">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[40px] border-8 border-white bg-gradient-to-br from-yellow-200 via-orange-100 to-emerald-200 shadow-2xl">
              <div className="px-8 text-center">
                <div className="text-8xl sm:text-9xl">🧸</div>

                <p className="mt-5 text-xl font-bold text-slate-700">
                  之後這裡會放幼兒園主視覺照片
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  照片可以由園方從後台自行更換
                </p>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-4 rounded-3xl bg-white px-5 py-4 shadow-xl">
              <p className="text-2xl font-bold text-orange-500">15+</p>
              <p className="text-sm text-slate-500">年幼教經驗</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-orange-500">OUR FEATURES</p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              給孩子最溫暖的學習環境
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              從學習、生活到情緒發展，我們用專業與愛心陪伴孩子穩定成長。
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-3xl border border-orange-100 bg-[#fffdf8] p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-orange-500">
                    <Icon className="size-7" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section id="courses" className="bg-[#fffafd] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-[#df0873]">OUR COURSES</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              多元課程，陪伴孩子探索成長
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              依照不同年齡發展，規劃生活、藝術、語言、體能與探索課程。
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "幼幼班",
                age: "2～3 歲",
                description: "建立生活常規、安全感與基本表達能力。",
                emoji: "🧸",
              },
              {
                title: "小班",
                age: "3～4 歲",
                description: "透過遊戲與團體互動，培養探索與合作能力。",
                emoji: "🌱",
              },
              {
                title: "中班",
                age: "4～5 歲",
                description: "加強語言、創作、邏輯與生活自理能力。",
                emoji: "🎨",
              },
              {
                title: "大班",
                age: "5～6 歲",
                description: "銜接國小生活，建立自信與自主學習能力。",
                emoji: "🎒",
              },
            ].map((course) => (
              <article
                key={course.title}
                className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="text-5xl">{course.emoji}</div>
                <p className="mt-5 text-sm font-semibold text-[#df0873]">
                  {course.age}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{course.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">
                  {course.description}
                </p>
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
              { title: "創意美術課", emoji: "🎨" },
              { title: "戶外探索日", emoji: "🌳" },
              { title: "歡樂節慶活動", emoji: "🎈" },
            ].map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-pink-100 bg-[#fffafd]"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-100 text-7xl">
                  {item.emoji}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-500">
                    之後可由園方從後台上傳照片
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="bg-[#fffafd] py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-[#df0873]">LATEST NEWS</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              最新消息
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              掌握招生、活動與園務公告。
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {newsItems.length > 0 ? (
  newsItems.map((news) => (
    <article
      key={news._id}
      className="rounded-3xl border border-pink-100 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="rounded-full bg-pink-100 px-3 py-1 font-semibold text-[#df0873]">
          最新消息
        </span>

        <time className="text-slate-500">
          {news.publishedAt
            ? new Intl.DateTimeFormat("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }).format(new Date(news.publishedAt))
            : "尚未設定日期"}
        </time>
      </div>

      <h3 className="mt-6 text-xl font-bold leading-8">
        {news.title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {news.summary || "點擊查看完整消息內容。"}
      </p>

      <Link
        href={news.slug ? `/news/${news.slug}` : "#news"}
        className="mt-6 inline-block font-semibold text-[#df0873]"
      >
        閱讀更多 →
      </Link>
    </article>
  ))
) : (
  <div className="col-span-full rounded-3xl border border-dashed border-pink-200 bg-white p-10 text-center">
    <p className="text-lg font-bold">目前還沒有最新消息</p>
    <p className="mt-2 text-slate-500">
      從後台發布消息後，內容就會自動出現在這裡。
    </p>
  </div>
)}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="font-semibold text-[#df0873]">CONTACT US</p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              歡迎預約參觀米堤爾幼兒園
            </h2>
            <p className="mt-5 max-w-xl leading-8 text-slate-600">
              歡迎家長來電或透過 LINE 與我們聯絡，了解課程、招生與參觀時段。
            </p>

            <div className="mt-8 space-y-4 text-slate-700">
              <p>
                <span className="font-bold">地址：</span>
                之後填入幼兒園正式地址
              </p>
              <p>
                <span className="font-bold">電話：</span>
                之後填入聯絡電話
              </p>
              <p>
                <span className="font-bold">服務時間：</span>
                週一至週五 08:00～17:30
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="tel:"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#df0873] px-8 font-medium text-white transition hover:bg-[#c80767]"
              >
                電話諮詢
              </a>

              <a
                href="#"
                className="inline-flex h-12 items-center justify-center rounded-full border border-pink-200 bg-white px-8 font-medium transition hover:bg-pink-50"
              >
                LINE 聯絡
              </a>
            </div>
          </div>

          <div className="flex min-h-[360px] items-center justify-center rounded-[36px] border border-pink-100 bg-gradient-to-br from-pink-100 via-white to-purple-100 p-8 text-center">
            <div>
              <div className="text-7xl">📍</div>
              <p className="mt-5 text-xl font-bold">Google 地圖位置</p>
              <p className="mt-2 text-slate-500">
                取得正式地址後，再嵌入園所地圖
              </p>
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