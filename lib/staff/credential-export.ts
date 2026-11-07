export type ExportedCredential = {
  accountCode: string;
  password: string;
  displayName: string;
  jobTitle: string;
  roleLabel: string;
  createdAt: string;
};

function bytesToBase64(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function base64ToBytes(value: string) {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

async function deriveKey(password: string, salt: Uint8Array, iterations: number) {
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations},
    material,
    {name: "AES-GCM", length: 256},
    false,
    ["encrypt", "decrypt"],
  );
}

export async function encryptCredentialFile(credentials: ExportedCredential[], password: string) {
  const iterations = 250_000;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt, iterations);
  const plaintext = new TextEncoder().encode(JSON.stringify({
    version: 1,
    organization: "米堤爾幼兒園",
    exportedAt: new Date().toISOString(),
    credentials,
  }));
  const encrypted = await crypto.subtle.encrypt({name: "AES-GCM", iv: iv as BufferSource}, key, plaintext);

  return JSON.stringify({
    format: "miter-staff-credentials",
    version: 1,
    algorithm: "AES-256-GCM",
    keyDerivation: "PBKDF2-SHA256",
    iterations,
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    data: bytesToBase64(new Uint8Array(encrypted)),
  }, null, 2);
}

export async function decryptCredentialFile(fileText: string, password: string) {
  const payload = JSON.parse(fileText) as {format: string; iterations: number; salt: string; iv: string; data: string};
  if (payload.format !== "miter-staff-credentials") throw new Error("不是米堤爾帳密加密檔案");
  const salt = base64ToBytes(payload.salt);
  const iv = base64ToBytes(payload.iv);
  const key = await deriveKey(password, salt, payload.iterations);
  const plaintext = await crypto.subtle.decrypt(
    {name: "AES-GCM", iv: iv as BufferSource},
    key,
    base64ToBytes(payload.data) as BufferSource,
  );
  return JSON.parse(new TextDecoder().decode(plaintext)) as {
    organization: string;
    exportedAt: string;
    credentials: ExportedCredential[];
  };
}
