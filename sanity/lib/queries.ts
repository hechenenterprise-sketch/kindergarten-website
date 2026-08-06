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
export const homeSettingsQuery = `
*[_type == "homeSettings"][0]{
  heroImage,
  eyebrow,
  title,
  highlightTitle,
  description,
  primaryButtonText,
  secondaryButtonText
}
`;

export const coursesQuery = `
*[_type == "course"] | order(order asc){
  _id,
  title,
  age,
  description,
  image,
  order
}
`;