import {NextResponse} from "next/server";

import {requireStaffRoles} from "@/lib/staff/authorization";
import {publishStaffContent, type StaffContentPayload, type StaffContentSection} from "@/lib/staff/content-publish";
import {createStaffSanityClient} from "@/lib/staff/sanity-write";

const reviewSections = ["news", "gallery", "brochure"] as const;

export async function GET() {
  const authorization = await requireStaffRoles(["owner", "principal"]);
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const sanity = createStaffSanityClient();
  const items = await sanity.fetch(`*[_type == "staffContentSubmission" && status == "pending"] | order(submittedAt asc){
    _id, section, targetId, payloadJson, submittedByName, submittedByRole, submittedAt
  }`);
  return NextResponse.json({items});
}

export async function POST(request: Request) {
  const authorization = await requireStaffRoles(["owner", "principal"]);
  if (!authorization) return NextResponse.json({error: "沒有權限"}, {status: 403});

  const body = await request.json().catch(() => null) as {id?: string; action?: string} | null;
  const id = body?.id?.trim();
  const action = body?.action;
  if (!id || !["approve", "reject"].includes(action || "")) {
    return NextResponse.json({error: "審核資料不完整"}, {status: 400});
  }

  const sanity = createStaffSanityClient();
  const submission = await sanity.fetch(`*[_type == "staffContentSubmission" && _id == $id && status == "pending"][0]{
    _id, section, targetId, payloadJson
  }`, {id});
  if (!submission) return NextResponse.json({error: "此內容已處理或不存在"}, {status: 404});
  if (!reviewSections.includes(submission.section as (typeof reviewSections)[number])) {
    return NextResponse.json({error: "內容類型不正確"}, {status: 400});
  }

  if (action === "approve") {
    let payload: StaffContentPayload;
    try {
      payload = JSON.parse(submission.payloadJson) as StaffContentPayload;
    } catch {
      return NextResponse.json({error: "內容資料損毀，無法發布"}, {status: 400});
    }
    await publishStaffContent(submission.section as StaffContentSection, submission.targetId, payload);
  }

  await sanity.patch(id).set({
    status: action === "approve" ? "approved" : "rejected",
    reviewedAt: new Date().toISOString(),
    reviewedBy: authorization.user.id,
    reviewedByName: authorization.profile.display_name,
  }).commit();

  await authorization.service.from("audit_logs").insert({
    organization_id: authorization.profile.organization_id,
    actor_user_id: authorization.user.id,
    action: `staff.content_${action === "approve" ? "approved" : "rejected"}.${submission.section}`,
    metadata: {submission_id: id, document_id: submission.targetId},
  });

  return NextResponse.json({success: true});
}
