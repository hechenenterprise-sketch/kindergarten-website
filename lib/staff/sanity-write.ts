import "server-only";

import {client} from "@/sanity/lib/client";

export function createStaffSanityClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!token) throw new Error("Sanity write access is not configured");
  return client.withConfig({token, useCdn: false});
}

export function textToPortableText(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => ({
      _type: "block",
      _key: crypto.randomUUID().replaceAll("-", "").slice(0, 12),
      style: "normal",
      markDefs: [],
      children: [{
        _type: "span",
        _key: crypto.randomUUID().replaceAll("-", "").slice(0, 12),
        marks: [],
        text: paragraph,
      }],
    }));
}

export async function uploadStaffAsset(type: "image" | "file", value: FormDataEntryValue | null) {
  if (!(value instanceof File) || value.size === 0) return null;
  const sanity = createStaffSanityClient();
  return sanity.assets.upload(type, Buffer.from(await value.arrayBuffer()), {
    filename: value.name,
    contentType: value.type || undefined,
  });
}
