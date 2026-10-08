# 米堤爾 2.0 改版方案與第一版

## 隔離方式
- 原專案：C:\Projects\kindergarten-website，main 保持原樣。
- 改版專案：C:\Projects\kindergarten-website-v2。
- 分支：redesign/miter-2.0，從 cc37d82 建立。
- 僅本機預覽，未推送或部署至正式站。
- 本機環境未保留 Sanity 寫入 token，首頁也不呼叫瀏覽計數。

## 現況與內容範圍
現有 Next.js 16.3 + React 19 + Sanity 5。首頁原先包含主視覺、關於我們、四項理念、課程、相簿、招生簡章、師資、聯絡與頁尾。消息已由設定關閉，但程式碼原先仍顯示師資、相簿與登入入口；本版依使用者明確指示隱藏這三者。

沿用 homeSettings、aboutSettings、course、contactSettings 和已發布 brochure 的既有查詢。未更動 Sanity schema、Studio、dataset 或後台內容。首頁不查詢 news、teacher、gallery，也不將這些資料傳至瀏覽器。原有 news 頁面的 notFound 防護維持。

## 設計方案
1. B 雜誌式創意敘事 70%：奶油白底、章節編號、細分隔線、大幅留白、文字層次與錯落課程排列。
2. D 沉浸互動 30%：成長曲線繪製、滾動進場、照片細微放大、裝飾呼吸動畫與按鈕回饋。
3. 品牌粉色為行動重點，柔和綠色代表探索，淡黄色與粉色作點綴。
4. 主視覺採 310px / 164px 圓形照片，柔化邊緣搭配淡光暈。缺照片時採植物意象佔位，不杜撰園所照片。
5. 行動版重排主視覺、兩欄課程與單欄聯絡；提供鍵盤焦點、跳至內容與減少動態效果。

## 第一版實作
公開內容顺序：主視覺 → 關於我們與教育理念 → 課程 → 招生簡章 → 聯絡 → 頁尾。
沿用原 CMS 文案、照片、電話、LINE、Facebook、地圖與 PDF；保留公開聯絡操作。
Footer 固定：© 2026 米堤爾幼兒園｜Website by HECHEN DIGITAL。

## 後續
先檢視本機第一版的照片裁切、留白與手機體驗；依回饋調整。若需要雲端預覽，再建立獨立 Preview 部署並確認存取範圍，不發布正式站。

## 驗證結果
- npm run build：通過，包含 TypeScript 與頁面生成。
- npm run lint：通過。
- 本機 /news 與 /news/preview-check：均為 404。
- 桌機與 390px 手機畫面：已檢視；手機無橫向溢出。
- 手機選單開啟、Escape 關閉、預約參觀跳轉：正常。
- 首頁消息／師資／相簿／後台相關連結數：0。
- Sanity 公開理念與聯絡內容已載入；目前 hero/about 照片缺省、課程列表為空，使用設計佔位與空內容提示。
- Sanity schema 與後台內容未變更。原主分支保持乾淨。
- 預覽：http://localhost:3002（限此電腦的本機服務）。

## 預留模組（保持關閉）
保留以下可啟用模組，不以空白區塊或隱藏 HTML 預留：
- 最新消息：主視覺之後、關於我們之前，採雜誌式消息列表。
- 活動相簿：課程之後、招生簡章之前，沿用既有燈箱。
- 師資團隊：招生簡章之後、聯絡之前，採圓形照片與介紹。
- 園務登入：独立的導覽開關，既有登入頁與 Studio 保留。

開關集中於 lib/site-mode.ts：showNews、showGallery、showTeachers、showAdminLogin，目前均為 false。桌機與手機導覽共用 site-navigation，同步依開關顯示。消息列表、詳細頁及 sitemap 沿用同一 showNews 設定。

模組在查詢 Sanity 前先檢查開關；關閉時不查詢、不生成 DOM、不傳送內容、不保留頁面空隙。未開啟任何隱藏資料。

## 參考圖風格調整
改用使用者提供的「愛與探索的每一天」參考圖之視覺語彙：連續奶油白底、淡粉色手繪成長曲線、淡彩暈染、花草與太陽線稿、三個錯落圓形照片位置、左右交錯敘事與淡粉頁尾。
保留 CMS 既有內容與年資，不套用參考圖的人物照片、20+ 年資或新增未公開內容。空照片位置使用可替換的柔邊淡彩佔位，不挪用本機未確認公開的舊照片。
最新消息、師資、相簿與後台入口開關仍關閉。

## 完整內容本機預覽
依使用者要求，本機開啟最新消息、活動相簿與師資團隊。使用 NEXT_PUBLIC_MITER_FULL_PREVIEW=true 且 NODE_ENV=development 雙重條件，production 建置仍保持三個區塊關閉；後台入口仍關閉。
最新消息載入既有三則測試資料；師資與相簿尚無資料，使用明確標示的版型示意。地圖縮至桌機最大 440px / 手機最大 335px，縮短聯絡區留白。

## 最新獨立部署
預覽網址：https://kindergarten-website-lvhbhxmg6-ch0217.vercel.app
2026-10-09 已完成 Vercel Preview 建置，保留 Vercel 登入保護，未發布 production 或替換正式網址。
改用清晰黑體區段標題；合法立案／專業幼教／安心成長放大並加勾；新增不同的蝴蝶、彩虹與雲朵線稿。
完整內容開關僅在本機 development 或明確設定的 preview target 生效；未修改正式環境變數。

## 2.0 正式上線
2026-10-09 使用者明確授權後完成 production 部署。
正式網址：https://kindergarten-website-red.vercel.app
Deployment：dpl_49FwkshEWdXbWZ9Bw1BZf4NNXZ8k
程式碼版本：b2b3923（redesign/miter-2.0）。
正式部署明確關閉 NEXT_PUBLIC_MITER_FULL_PREVIEW，保留原公開形象網站範圍。首頁 200、新版樣式、頁尾與聯絡資訊已確認；消息、師資、相簿與登入入口不顯示，/news 與 /login 均 404。
完整展示版仍保留：https://kindergarten-website-2hv5mv0p6-ch0217.vercel.app（Vercel 登入保護）。
Sanity schema 與資料未修改。正式發布採獨立工作目錄，原 main checkout 未修改；改版程式碼保存在 redesign/miter-2.0 分支，未推送 GitHub。
