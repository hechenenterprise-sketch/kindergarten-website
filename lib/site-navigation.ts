import {publicSiteConfig} from "@/lib/site-mode";

export const siteNavigation = [
  ...(publicSiteConfig.showNews ? [{href: "#news", label: "最新消息"}] : []),
  {href: "#about", label: "關於我們"},
  {href: "#courses", label: "課程介紹"},
  ...(publicSiteConfig.showGallery ? [{href: "#gallery", label: "活動相簿"}] : []),
  {href: "#enrollment", label: "招生簡章"},
  ...(publicSiteConfig.showTeachers ? [{href: "#teachers", label: "師資團隊"}] : []),
  {href: "#contact", label: "預約參觀"},
  ...(publicSiteConfig.showAdminLogin ? [{href: "/login", label: "園務登入"}] : []),
];
