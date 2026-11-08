import {z} from "zod";
import {staffRoles} from "@/lib/staff/config";

export const accountCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z0-9]{4}$/, "帳號必須是 4 碼英文字母或數字");

export const staffPasswordSchema = z
  .string()
  .regex(/^\d{6}$/, "密碼必須是 6 碼數字");

export const createStaffSchema = z.object({
  accountCode: accountCodeSchema,
  password: staffPasswordSchema,
  displayName: z.string().trim().min(1, "請輸入使用者名字").max(50),
  jobTitle: z.string().trim().min(1, "請輸入職位").max(50),
  role: z.enum(staffRoles),
});

export const staffLoginSchema = z.object({
  accountCode: accountCodeSchema,
  password: staffPasswordSchema,
});

export function generateNumericPassword() {
  const bytes = new Uint32Array(1);
  crypto.getRandomValues(bytes);
  return String(bytes[0] % 1_000_000).padStart(6, "0");
}
