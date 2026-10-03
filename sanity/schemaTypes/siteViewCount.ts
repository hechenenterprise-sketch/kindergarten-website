import {defineField, defineType} from "sanity";

export const siteViewCount = defineType({
  name: "siteViewCount",
  title: "網站瀏覽次數",
  type: "document",
  fields: [
    defineField({
      name: "count",
      title: "累計瀏覽次數",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "lastViewedAt",
      title: "最後瀏覽時間",
      type: "datetime",
      readOnly: true,
    }),
  ],
});
