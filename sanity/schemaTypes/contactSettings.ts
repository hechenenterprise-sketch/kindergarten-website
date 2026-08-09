import {defineField, defineType} from "sanity";

export const contactSettings = defineType({
  name: "contactSettings",
  title: "聯絡資訊",
  type: "document",

  fields: [
    defineField({
      name: "address",
      title: "園所地址",
      type: "string",
    }),

    defineField({
      name: "phone",
      title: "聯絡電話",
      type: "string",
    }),

    defineField({
      name: "serviceHours",
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
      name: "googleMapEmbedUrl",
      title: "Google 地圖嵌入網址",
      type: "url",
      description: "請貼 Google Maps「嵌入地圖」iframe 裡 src 的網址。",
    }),

    defineField({
      name: "description",
      title: "聯絡區介紹文字",
      type: "text",
      rows: 3,
      initialValue:
        "歡迎家長來電或透過 LINE 與我們聯絡，了解招生資訊、課程內容與可預約參觀的時段。",
    }),
  ],

  preview: {
    prepare() {
      return {
        title: "聯絡資訊",
      };
    },
  },
});