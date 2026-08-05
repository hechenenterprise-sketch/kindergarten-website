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
      name: "phone",
      title: "聯絡電話",
      type: "string",
    }),

    defineField({
      name: "address",
      title: "園所地址",
      type: "string",
    }),

    defineField({
      name: "businessHours",
      title: "服務時間",
      type: "string",
      initialValue: "週一至週五 08:00～17:30",
    }),

    defineField({
      name: "lineUrl",
      title: "LINE 連結",
      type: "url",
    }),

    defineField({
      name: "facebookUrl",
      title: "Facebook 連結",
      type: "url",
    }),

    defineField({
      name: "instagramUrl",
      title: "Instagram 連結",
      type: "url",
    }),

    defineField({
      name: "googleMapUrl",
      title: "Google 地圖連結",
      type: "url",
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