import Image from "next/image";
import Link from "next/link";

import {client} from "@/sanity/lib/client";
import {allNewsQuery} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

type NewsItem = {
  _id: string;
  title: string;
  slug?: string;
  publishedAt?: string;
  summary?: string;
  coverImage?: unknown;
};

export default async function NewsListPage() {
  const newsItems = await client
    .fetch<NewsItem[]>(allNewsQuery)
    .catch(() => []);

  return (
    <main className="min-h-screen bg-[#fffdf8] text-slate-800">
      <header className="border-b border-pink-100 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/miter-logo.jpg"
              alt="米堤爾幼兒園"
              width={130}
              height={80}
              className="h-14 w-auto object-contain"
            />

            <div className="hidden sm:block">
              <p className="font-bold text-[#df0873]">
                米堤爾幼兒園
              </p>

              <p className="text-xs text-slate-500">
                Miter Kindergarten
              </p>
            </div>
          </Link>

          <Link
            href="/"
            className="font-semibold text-[#df0873] transition hover:opacity-70"
          >
            ← 返回首頁
          </Link>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <div className="text-center">
            <p className="font-semibold tracking-widest text-[#df0873]">
              LATEST NEWS
            </p>

            <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
              最新消息
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              掌握米堤爾幼兒園最新的招生資訊、活動消息與園務公告。
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {newsItems.length > 0 ? (
              newsItems.map((news) => (
                <Link
                  key={news._id}
                  href={news.slug ? `/news/${news.slug}` : "#"}
                  className="group grid overflow-hidden rounded-[28px] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl md:grid-cols-[220px_1fr]"
                >
                  <div className="relative min-h-[180px] overflow-hidden bg-pink-50">
                    {news.coverImage ? (
                      <Image
                        src={urlFor(news.coverImage)
                          .width(700)
                          .height(500)
                          .url()}
                        alt={news.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 220px"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full min-h-[180px] items-center justify-center text-5xl">
                        📰
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-[#df0873]">
                        公告
                      </span>

                      {news.publishedAt && (
                        <time className="text-sm text-slate-500">
                          {new Intl.DateTimeFormat("zh-TW", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }).format(new Date(news.publishedAt))}
                        </time>
                      )}
                    </div>

                    <h2 className="mt-4 text-2xl font-bold transition group-hover:text-[#df0873]">
                      {news.title}
                    </h2>

                    <p className="mt-3 line-clamp-2 leading-7 text-slate-600">
                      {news.summary || "點擊查看完整消息內容。"}
                    </p>

                    <p className="mt-5 font-semibold text-[#df0873]">
                      閱讀更多 →
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-pink-200 bg-white p-12 text-center text-slate-500">
                目前尚無最新消息
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}