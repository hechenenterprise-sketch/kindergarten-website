import {defineQuery} from "next-sanity";

export const latestNewsQuery = defineQuery(`
  *[_type == "news"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    summary,
    coverImage
  }
`);