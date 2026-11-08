import "server-only";

import {createStaffSanityClient} from "@/lib/staff/sanity-write";

export type StaffContentSection = "news" | "gallery" | "brochure";
export type StaffContentPayload = Record<string, unknown>;

export async function publishStaffContent(section: StaffContentSection, documentId: string, payload: StaffContentPayload) {
  const sanity = createStaffSanityClient();
  const typeBySection = {news: "news", gallery: "gallery", brochure: "brochure"};
  await sanity.createIfNotExists({_id: documentId, _type: typeBySection[section]});
  const patch = sanity.patch(documentId).set(payload);
  if (section === "news") patch.setIfMissing({publishedAt: new Date().toISOString()});
  await patch.commit({autoGenerateArrayKeys: true});
}
