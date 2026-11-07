import {createStaffServerClient, createStaffServiceClient} from "@/lib/supabase/server";

export async function requireStaffOwner() {
  const supabase = await createStaffServerClient();
  const {data: {user}} = await supabase.auth.getUser();
  if (!user) return null;

  const service = createStaffServiceClient();
  const {data: profile} = await service
    .from("staff_profiles")
    .select("user_id, organization_id, display_name, job_title, role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_active || profile.role !== "owner") return null;
  return {user, profile, service};
}
