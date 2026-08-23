import {defineQuery} from "next-sanity";

export const newsBySlugQuery = defineQuery(`
*[_type=="news" && (slug.current==$slug || _id==$slug)][0]{
  _id,
  title,
  "slug": coalesce(slug.current, _id),
  publishedAt,
  summary,
  coverImage,
  content
}
`);

export const latestNewsQuery = defineQuery(`
  *[_type == "news"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": coalesce(slug.current, _id),
    publishedAt,
    summary,
    coverImage
  }
`);

export const allNewsQuery = `
*[_type=="news"] | order(publishedAt desc){
  _id,
  title,
  "slug": coalesce(slug.current, _id),
  publishedAt,
  summary,
  coverImage
}
`;

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

export const teachersQuery = `
*[_type=="teacher"] | order(order asc){
  _id,
  name,
  title,
  description,
  image
}
`;

export const galleryQuery = `
*[_type=="gallery"] | order(order asc){
  _id,
  title,
  description,
  image,
  order
}
`;

export const contactSettingsQuery = `
*[_type == "contactSettings"][0]{
  address,
  phone,
  serviceHours,
  lineUrl,
  facebookUrl,
  googleMapEmbedUrl,
  description
}
`;

export const aboutSettingsQuery = `
*[_type == "aboutSettings"][0]{
  image,
  eyebrow,
  title,
  description1,
  description2,
  experienceYears,
  experienceLabel,
  feature1Title,
  feature1Description,
  feature2Title,
  feature2Description
}
`;

export const brochureQuery = `
*[_type=="brochure" && publish==true][0]{
  title,
  "pdfUrl": pdf.asset->url
}
`;