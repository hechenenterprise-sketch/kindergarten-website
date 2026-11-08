import {createStaffServerClient, createStaffServiceClient} from "@/lib/supabase/server";
import type {StaffRole} from "@/lib/staff/config";

export async function requireStaffRoles(allowedRoles: StaffRole[]) {
  const supabase = await createStaffServerClient();
  const {data: {user}} = await supabase.auth.getUser();
  if (!user) return null;

  const service = createStaffServiceClient();
  const {data: profile} = await service
    .from("staff_profiles")
    .select("user_id, organization_id, display_name, job_title, role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_active || !allowedRoles.includes(profile.role as StaffRole)) return null;
  return {user, profile: {...profile, role: profile.role as StaffRole}, service};
}

export async function requireStaffOwner() {
  return requireStaffRoles(["owner"]);
}
