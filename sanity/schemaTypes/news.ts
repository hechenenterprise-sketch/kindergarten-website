import {defineField, defineType} from "sanity";

export const news = defineType({
  name: "news",
  title: "最新消息",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "標題",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
  name: "slug",
  title: "網址名稱",
  type: "slug",
  options: {
    source: "title",
    maxLength: 96,
  },
  hidden: true,
}),

    defineField({
      name: "publishedAt",
      title: "發布日期",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "category",
      title: "資訊分類",
      type: "string",
      description: "請選擇這則消息是園方公告或政府發布的資訊。",
      options: {
        list: [
          {title: "校務資訊", value: "school"},
          {title: "政府資訊", value: "government"},
          {title: "活動資訊", value: "activity"},
        ],
        layout: "radio",
      },
      initialValue: "school",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "coverImage",
      title: "封面圖片",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "summary",
      title: "摘要",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "content",
      title: "內容",
      type: "array",
      of: [
        {type: "block"},
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            defineField({
              name: "alt",
              title: "圖片說明",
              type: "string",
              description: "會顯示在圖片下方，也能協助搜尋引擎與無障礙閱讀。",
            }),
          ],
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
      publishedAt: "publishedAt",
      category: "category",
      media: "coverImage",
    },
    prepare({title, publishedAt, category, media}) {
      const categoryLabels: Record<string, string> = {
        school: "校務資訊",
        government: "政府資訊",
        activity: "活動資訊",
      };
      const categoryLabel = categoryLabels[category] || "校務資訊";

      return {
        title,
        subtitle: publishedAt ? `${categoryLabel}｜${publishedAt}` : categoryLabel,
        media,
      };
    },
  },
});
