import {defineField, defineType} from "sanity";

export const featuredActivity = defineType({
  name: "featuredActivity",
  title: "特色活動",
  type: "document",
  fields: [
    defineField({name: "title", title: "活動名稱", type: "string", validation: (rule) => rule.required()}),
    defineField({name: "image", title: "活動照片", type: "image", options: {hotspot: true}, validation: (rule) => rule.required()}),
    defineField({name: "description", title: "活動介紹", type: "text", rows: 3}),
    defineField({name: "order", title: "排序", type: "number", initialValue: 1}),
    defineField({name: "isVisible", title: "顯示於網站", type: "boolean", initialValue: true}),
  ],
  preview: {select: {title: "title", subtitle: "description", media: "image"}},
});
