import {redirect} from "next/navigation";
import CredentialFileViewer from "@/components/staff/CredentialFileViewer";
import {requireStaffOwner} from "@/lib/staff/authorization";
import {staffPortalConfigured} from "@/lib/staff/config";

export const dynamic = "force-dynamic";
export const metadata = {title: "開啟加密帳密檔案｜米堤爾幼兒園"};

export default async function CredentialDecryptPage() {
  if (!staffPortalConfigured || !await requireStaffOwner()) redirect("/staff-admin/login");
  return <CredentialFileViewer/>;
}
