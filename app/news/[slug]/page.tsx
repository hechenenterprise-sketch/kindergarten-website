import Image from "next/image";
import Link from "next/link";
import {notFound} from "next/navigation";
import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";

import {client} from "@/sanity/lib/client";
import {newsBySlugQuery} from "@/sanity/lib/queries";
import {urlFor} from "@/sanity/lib/image";
import NewsCategoryBadge from "@/components/NewsCategoryBadge";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({value}) => {
      if (!value?.asset) {
        return null;
      }

      return (
        <figure className="my-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-pink-50 shadow-md">
            <Image
              src={urlFor(value)
                .width(1400)
                .height(900)
                .fit("max")
                .auto("format")
                .url()}
              alt={value.alt || "最新消息內文圖片"}
              fill
              sizes="(max-width: 896px) calc(100vw - 2.5rem), 896px"
              className="object-contain"
            />
          </div>
          {value.alt ? (
            <figcaption className="mt-3 text-center text-sm leading-6 text-slate-500">
              {value.alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export default async function NewsPage({params}: Props) {
  const {slug} = await params;

  const news = await client.fetch(newsBySlugQuery, {slug});

  if (!news) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffdf8] py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-5">

        <Link
          href="/#news"
          className="text-[#df0873] hover:underline"
        >
          ← 返回最新消息
        </Link>

        <h1 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl">
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

        <div className="mt-4">
          <NewsCategoryBadge category={news.category} />
        </div>

        {news.coverImage && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[24px] shadow-xl sm:mt-10 sm:rounded-[32px]">
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
          <p className="mt-7 text-base leading-8 text-slate-600 sm:mt-8 sm:text-lg">
            {news.summary}
          </p>
        )}

        <article className="prose mt-8 max-w-none sm:prose-lg sm:mt-10">
  {news.content ? (
    <PortableText value={news.content} components={portableTextComponents} />
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
