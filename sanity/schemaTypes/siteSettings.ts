import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "網站設定",
  type: "document",

  fields: [
    defineField({
      name: "kindergartenName",
      title: "幼兒園名稱",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "englishName",
      title: "英文名稱",
      type: "string",
    }),

    defineField({
      name: "logo",
      title: "網站 Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

  

    defineField({
      name: "footerText",
      title: "頁尾文字",
      type: "string",
      initialValue: "© 2026 米堤爾幼兒園 All Rights Reserved.",
    }),
  ],

  preview: {
    select: {
      title: "kindergartenName",
      subtitle: "englishName",
      media: "logo",
    },
  },
});