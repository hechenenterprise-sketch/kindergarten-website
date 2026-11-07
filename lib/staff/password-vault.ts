import "server-only";

import {createCipheriv, createDecipheriv, createHash, randomBytes} from "node:crypto";

const version = "v1";

function getEncryptionKey() {
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!secret) throw new Error("Staff password vault is not configured");
  return createHash("sha256").update(`${secret}:miter-staff-password-vault`).digest();
}

export function encryptStaffPassword(password: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(password, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return [version, iv.toString("base64url"), authTag.toString("base64url"), encrypted.toString("base64url")].join(".");
}

export function decryptStaffPassword(value?: string | null) {
  if (!value) return null;

  try {
    const [payloadVersion, iv, authTag, encrypted] = value.split(".");
    if (payloadVersion !== version || !iv || !authTag || !encrypted) return null;
    const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(), Buffer.from(iv, "base64url"));
    decipher.setAuthTag(Buffer.from(authTag, "base64url"));
    return Buffer.concat([decipher.update(Buffer.from(encrypted, "base64url")), decipher.final()]).toString("utf8");
  } catch {
    return null;
  }
}
