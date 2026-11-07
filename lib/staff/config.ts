export const staffPortalConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.SUPABASE_SERVICE_ROLE_KEY,
);

export const staffOrganizationSlug =
  process.env.STAFF_ORGANIZATION_SLUG || "miter";

export const staffRoles = ["owner", "director", "office", "teacher"] as const;
export type StaffRole = (typeof staffRoles)[number];

export const staffRoleLabels: Record<StaffRole, string> = {
  owner: "管理員",
  director: "主任",
  office: "行政",
  teacher: "老師",
};

export const roleCapabilities: Record<StaffRole, string[]> = {
  owner: ["帳號管理", "招生簡章", "最新消息", "活動與相簿", "審核與發布"],
  director: ["招生簡章", "最新消息", "活動與相簿", "審核與發布"],
  office: ["最新消息", "活動與相簿", "內容整理"],
  teacher: ["提供活動素材", "上傳照片", "查看自己的處理狀態"],
};
