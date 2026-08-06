import {defineField, defineType} from "sanity";

export const course = defineType({
  name: "course",
  title: "課程介紹",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "課程名稱",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "age",
      title: "適用年齡",
      type: "string",
      placeholder: "例如：2-3歲",
    }),

    defineField({
      name: "description",
      title: "課程介紹",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "image",
      title: "課程圖片",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "order",
      title: "顯示順序",
      type: "number",
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "age",
      media: "image",
    },
  },
});