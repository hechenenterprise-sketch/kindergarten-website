import {defineField, defineType} from "sanity";

export const teacher = defineType({
  name: "teacher",
  title: "師資團隊",
  type: "document",

  fields: [
    defineField({
      name: "name",
      title: "姓名",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "title",
      title: "職稱",
      type: "string",
    }),

    defineField({
      name: "description",
      title: "介紹",
      type: "text",
      rows: 4,
    }),

    defineField({
      name: "image",
      title: "照片",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "order",
      title: "排序",
      type: "number",
      initialValue: 1,
    }),
  ],

  orderings: [
    {
      title: "排序",
      name: "orderAsc",
      by: [{field: "order", direction: "asc"}],
    },
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "title",
      media: "image",
    },
  },
});