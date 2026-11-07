import {NextResponse, type NextRequest} from "next/server";
import {staffPortalConfigured} from "@/lib/staff/config";
import {createStaffServerClient} from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  if (!staffPortalConfigured) return NextResponse.redirect(`${origin}/staff-admin/login?error=not-configured`);

  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next") || "/staff-admin";
  if (!code) return NextResponse.redirect(`${origin}/staff-admin/login?error=missing-code`);

  const supabase = await createStaffServerClient();
  const {error} = await supabase.auth.exchangeCodeForSession(code);
  if (error) return NextResponse.redirect(`${origin}/staff-admin/login?error=oauth`);

  const {data: {user}} = await supabase.auth.getUser();
  const {data: profile} = user
    ? await supabase.from("staff_profiles").select("role, is_active").eq("user_id", user.id).maybeSingle()
    : {data: null};

  if (!profile?.is_active || profile.role !== "owner") {
    await supabase.auth.signOut();
    return NextResponse.redirect(`${origin}/staff-admin/login?error=not-allowed`);
  }

  return NextResponse.redirect(`${origin}${next.startsWith("/") ? next : "/staff-admin"}`);
}
