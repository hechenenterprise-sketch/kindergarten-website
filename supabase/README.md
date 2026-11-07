# 米堤爾員工登入設定

員工入口使用 Supabase Auth 與 PostgreSQL；公開網站內容仍由 Sanity 管理。

## 必要環境變數

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STAFF_ORGANIZATION_SLUG=miter
```

`SUPABASE_SERVICE_ROLE_KEY` 只能放在本機 `.env.local` 與 Vercel Environment Variables，絕對不能放進瀏覽器或 GitHub。

## 啟用步驟

1. 建立 Supabase 專案。
2. 在 SQL Editor 執行 `supabase/migrations/001_staff_portal.sql`。
3. 在 Authentication → Providers 啟用 Google，將網站 callback 設為 `/auth/callback`。
4. 將園長 Google Email 加入 `admin_allowlist`（migration 檔案最下方有 SQL 範例）。
5. 將四個環境變數加入 `.env.local` 與 Vercel。
6. 先測試 `/staff-admin/login`、帳號建立、加密匯出、員工登入與停用。
7. 全部測試通過後，才將公開網站的「園務登入」改到 `/staff-login`。

## 安全原則

- 主任、行政、老師不直接取得 Supabase 或 Sanity 管理權限。
- 4 碼帳號只作識別，8 碼數字密碼由 Supabase Auth 加密保存。
- 登入錯誤 5 次鎖定 30 分鐘。
- 原始密碼只在建立或重設時回傳一次。
- 匯出檔案使用 PBKDF2-SHA256 與 AES-256-GCM 在瀏覽器本機加密。
- Supabase 不保存幼兒照片、家長資料或網站內容。
