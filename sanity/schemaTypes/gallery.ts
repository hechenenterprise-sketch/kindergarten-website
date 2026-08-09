import {defineField, defineType} from "sanity";

export const gallery = defineType({
  name: "gallery",
  title: "活動相簿",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "活動名稱",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "image",
      title: "活動照片",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "活動介紹",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "order",
      title: "排序",
      type: "number",
      initialValue: 1,
    }),
  ],

  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});