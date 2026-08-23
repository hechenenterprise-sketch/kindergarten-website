import {defineField, defineType} from "sanity";

export const brochure = defineType({
  name: "brochure",
  title: "招生簡章",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "標題",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "pdf",
      title: "PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publish",
      title: "是否顯示",
      type: "boolean",
      initialValue: true,
    }),
  ],
});