export const isFullPreview = process.env.NEXT_PUBLIC_MITER_FULL_PREVIEW === "true" &&
  (process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_MITER_PREVIEW_TARGET === "preview");

export const publicSiteConfig = {
  showNews: isFullPreview,
  showGallery: isFullPreview,
  showTeachers: isFullPreview,
  // 園務登入是園方日常管理入口，正式形象網站也必須保留。
  showAdminLogin: true,
  informationNotice:
    "本網站為園所形象與資訊展示使用，重要通知請以園方正式通知為準。",
} as const;
