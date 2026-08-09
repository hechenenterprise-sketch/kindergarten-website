import {defineField, defineType} from "sanity";

export const aboutSettings = defineType({
  name: "aboutSettings",
  title: "關於我們",
  type: "document",

  fields: [
    defineField({
      name: "image",
      title: "介紹圖片",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "eyebrow",
      title: "英文小標",
      type: "string",
      initialValue: "ABOUT MITER",
    }),

    defineField({
      name: "title",
      title: "標題",
      type: "string",
      initialValue: "認識米堤爾幼兒園",
    }),

    defineField({
      name: "description1",
      title: "介紹文字一",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "description2",
      title: "介紹文字二",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "experienceYears",
      title: "幼教經驗年數",
      type: "string",
      initialValue: "15+",
    }),

    defineField({
      name: "experienceLabel",
      title: "經驗文字",
      type: "string",
      initialValue: "年幼教經驗",
    }),

    defineField({
      name: "feature1Title",
      title: "特色一標題",
      type: "string",
      initialValue: "愛與陪伴",
    }),

    defineField({
      name: "feature1Description",
      title: "特色一介紹",
      type: "string",
      initialValue: "建立孩子安全感與自信心。",
    }),

    defineField({
      name: "feature2Title",
      title: "特色二標題",
      type: "string",
      initialValue: "快樂探索",
    }),

    defineField({
      name: "feature2Description",
      title: "特色二介紹",
      type: "string",
      initialValue: "鼓勵孩子主動學習與探索世界。",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "關於我們",
      };
    },
  },
});