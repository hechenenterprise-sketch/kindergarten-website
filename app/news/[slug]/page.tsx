import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {PortableText} from "@portabletext/react";

import {client} from "@/sanity/lib/client";
import {newsBySlugQuery} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NewsPage({params}: Props) {
  const {slug} = await params;

  const news = await client.fetch(newsBySlugQuery, {slug});

  if (!news) {
    notFound();
  }

  return (
    <main className="bg-[#fffdf8] py-16">
      <div className="mx-auto max-w-4xl px-5">

        <Link
          href="/#news"
          className="text-[#df0873] hover:underline"
        >
          ← 返回最新消息
        </Link>

        <h1 className="mt-6 text-4xl font-bold">
          {news.title}
        </h1>

        {news.publishedAt && (
  <p className="mt-3 text-slate-500">
    {new Intl.DateTimeFormat("zh-TW", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(news.publishedAt))}
  </p>
)}

        {news.coverImage && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[32px] shadow-xl">
            <Image
              src={urlFor(news.coverImage).width(1400).height(800).url()}
              alt={news.title}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {news.summary && (
          <p className="mt-8 text-lg leading-8 text-slate-600">
            {news.summary}
          </p>
        )}

        <article className="prose prose-lg mt-10 max-w-none">
  {news.content ? (
    <PortableText value={news.content} />
  ) : (
    <p className="text-slate-500">
      目前尚無內容。
    </p>
  )}
</article>

      </div>
    </main>
  );
}