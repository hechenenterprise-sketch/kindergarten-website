import {defineField, defineType} from "sanity";

export const homeSettings = defineType({
  name: "homeSettings",
  title: "首頁設定",
  type: "document",

  fields: [
    defineField({
      name: "heroImage",
      title: "首頁大圓照片",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "heroSecondaryImage",
      title: "首頁中圓照片",
      description: "顯示在首頁照片區上方的圓形照片。",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "heroTertiaryImage",
      title: "首頁小圓照片",
      description: "顯示在首頁照片區右側的圓形照片。",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "eyebrow",
      title: "首頁小標",
      type: "string",
      initialValue: "米堤爾幼兒園｜Miter Kindergarten",
    }),

    defineField({
      name: "title",
      title: "首頁主標題",
      type: "string",
      initialValue: "陪伴孩子探索世界",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "highlightTitle",
      title: "粉紅色重點標題",
      type: "string",
      initialValue: "快樂學習，自信成長",
    }),

    defineField({
      name: "description",
      title: "首頁介紹文字",
      type: "text",
      rows: 4,
      initialValue:
        "我們提供溫暖、安全且充滿創意的學習環境，陪伴每一位孩子探索興趣、建立自信，留下珍貴而快樂的童年回憶。",
    }),

    defineField({
      name: "readingFeatureImage",
      title: "閱讀探索特色照片",
      description: "顯示於多元課程下方的行動圖書車特色區塊。",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "readingFeatureTitle",
      title: "閱讀探索標題",
      type: "string",
      initialValue: "閱讀探索｜行動圖書車",
    }),

    defineField({
      name: "readingFeatureDescription",
      title: "閱讀探索介紹",
      type: "text",
      rows: 3,
      initialValue:
        "透過行動圖書車與多元繪本閱讀，引導孩子親近書本，在故事中培養想像力、表達力與閱讀興趣。",
    }),

    defineField({
      name: "primaryButtonText",
      title: "主要按鈕文字",
      type: "string",
      initialValue: "立即預約參觀",
    }),

    defineField({
      name: "secondaryButtonText",
      title: "次要按鈕文字",
      type: "string",
      initialValue: "認識米堤爾",
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "highlightTitle",
      media: "heroImage",
    },
  },
});
