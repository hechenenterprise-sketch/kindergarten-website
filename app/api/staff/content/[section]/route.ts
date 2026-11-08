import {NextResponse} from "next/server";

import {requireStaffRoles} from "@/lib/staff/authorization";
import type {StaffRole} from "@/lib/staff/config";
import {publishStaffContent, type StaffContentPayload, type StaffContentSection} from "@/lib/staff/content-publish";
import {createStaffSanityClient, textToPortableText, uploadStaffAsset} from "@/lib/staff/sanity-write";

const permissions: Record<string, StaffRole[]> = {
  news: ["owner", "principal", "director", "office"],
  gallery: ["owner", "principal", "director", "office", "teacher"],
  brochure: ["owner", "principal", "director"],
  photos: ["owner", "principal"],
};

function text(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

async function authorize(section: string) {
  const roles = permissions[section];
  if (!roles) return null;
  return requireStaffRoles(roles);
}

export async function GET(_request: Request, context: {params: Promise<{section: string}>}) {
  const {section} = await context.params;
  const authorization = await authorize(section);
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const sanity = createStaffSanityClient();
  if (section === "news") {
    const items = await sanity.fetch(`*[_type == "news"] | order(publishedAt desc){_id,title,category,summary,"content":pt::text(content),publishedAt}`);
    return NextResponse.json({items});
  }
  if (section === "gallery") {
    const items = await sanity.fetch(`*[_type == "gallery"] | order(order asc, _createdAt desc){_id,title,description,order,"imageUrl":image.asset->url}`);
    return NextResponse.json({items});
  }
  if (section === "photos") {
    const item = await sanity.fetch(`{
      "home": *[_type == "homeSettings"][0]{_id,"heroImageUrl":heroImage.asset->url,"heroSecondaryImageUrl":heroSecondaryImage.asset->url,"heroTertiaryImageUrl":heroTertiaryImage.asset->url},
      "about": *[_type == "aboutSettings"][0]{_id,"imageUrl":image.asset->url,"detailImageUrl":detailImage.asset->url}
    }`);
    return NextResponse.json({item});
  }

  const item = await sanity.fetch(`*[_type == "brochure"] | order(_updatedAt desc)[0]{_id,title,publish,"fileName":pdf.asset->originalFilename,"pdfUrl":pdf.asset->url}`);
  return NextResponse.json({item});
}

export async function POST(request: Request, context: {params: Promise<{section: string}>}) {
  const {section} = await context.params;
  const authorization = await authorize(section);
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const formData = await request.formData();
  const sanity = createStaffSanityClient();
  const requestedId = text(formData, "id");
  // Public Sanity documents must use a plain ID. Dot-separated IDs are treated
  // as namespaced/private and are not returned to the anonymous public client.
  const documentId = requestedId || crypto.randomUUID();
  let payload: StaffContentPayload;

  if (section === "photos") {
    const homeId = text(formData, "homeId") || "homeSettings.staff-managed";
    const aboutId = text(formData, "aboutId") || "aboutSettings.staff-managed";
    const homeFields = ["heroImage", "heroSecondaryImage", "heroTertiaryImage"] as const;
    const aboutFields = ["image", "detailImage"] as const;
    await sanity.createIfNotExists({_id: homeId, _type: "homeSettings"});
    await sanity.createIfNotExists({_id: aboutId, _type: "aboutSettings"});
    const homePatch = sanity.patch(homeId);
    const aboutPatch = sanity.patch(aboutId);
    let uploaded = false;
    for (const field of homeFields) {
      const asset = await uploadStaffAsset("image", formData.get(field));
      if (asset) {homePatch.set({[field]: {_type: "image", asset: {_type: "reference", _ref: asset._id}}}); uploaded = true;}
    }
    for (const field of aboutFields) {
      const asset = await uploadStaffAsset("image", formData.get(field));
      if (asset) {aboutPatch.set({[field]: {_type: "image", asset: {_type: "reference", _ref: asset._id}}}); uploaded = true;}
    }
    if (!uploaded) return NextResponse.json({error: "請至少選擇一張照片"}, {status: 400});
    await Promise.all([homePatch.commit(), aboutPatch.commit()]);
    await authorization.service.from("audit_logs").insert({organization_id: authorization.profile.organization_id, actor_user_id: authorization.user.id, action: "staff.content_saved.photos", metadata: {home_id: homeId, about_id: aboutId}});
    return NextResponse.json({success: true});
  }

  if (section === "news") {
    const title = text(formData, "title");
    if (!title) return NextResponse.json({error: "請填寫標題"}, {status: 400});
    const category = text(formData, "category") || "school";
    if (!["school", "government", "activity"].includes(category)) return NextResponse.json({error: "分類不正確"}, {status: 400});
    const imageAsset = await uploadStaffAsset("image", formData.get("image"));
    payload = {
      title,
      category,
      summary: text(formData, "summary"),
      content: textToPortableText(text(formData, "content")),
    };
    if (imageAsset) payload.coverImage = {_type: "image", asset: {_type: "reference", _ref: imageAsset._id}};
  } else if (section === "gallery") {
    const title = text(formData, "title");
    if (!title) return NextResponse.json({error: "請填寫活動名稱"}, {status: 400});
    const imageAsset = await uploadStaffAsset("image", formData.get("image"));
    if (!requestedId && !imageAsset) return NextResponse.json({error: "新增活動時請選擇照片"}, {status: 400});
    payload = {
      title,
      description: text(formData, "description"),
      order: Number(text(formData, "order")) || 1,
    };
    if (imageAsset) payload.image = {_type: "image", asset: {_type: "reference", _ref: imageAsset._id}};
  } else if (section === "brochure") {
    const title = text(formData, "title") || "招生簡章";
    const fileAsset = await uploadStaffAsset("file", formData.get("file"));
    if (!requestedId && !fileAsset) return NextResponse.json({error: "請選擇 PDF 檔案"}, {status: 400});
    payload = {title, publish: text(formData, "publish") === "true"};
    if (fileAsset) payload.pdf = {_type: "file", asset: {_type: "reference", _ref: fileAsset._id}};
  } else {
    return NextResponse.json({error: "功能不存在"}, {status: 404});
  }

  const canPublishDirectly = authorization.profile.role === "owner" || authorization.profile.role === "principal";
  if (canPublishDirectly) {
    await publishStaffContent(section as StaffContentSection, documentId, payload);
  } else {
    await sanity.create({
      _type: "staffContentSubmission",
      section,
      targetId: documentId,
      payloadJson: JSON.stringify(payload),
      submittedBy: authorization.user.id,
      submittedByName: authorization.profile.display_name,
      submittedByRole: authorization.profile.role,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });
  }

  await authorization.service.from("audit_logs").insert({
    organization_id: authorization.profile.organization_id,
    actor_user_id: authorization.user.id,
    action: canPublishDirectly ? `staff.content_saved.${section}` : `staff.content_submitted.${section}`,
    metadata: {document_id: documentId},
  });

  return NextResponse.json({success: true, pending: !canPublishDirectly, id: documentId});
}
