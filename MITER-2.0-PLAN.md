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
