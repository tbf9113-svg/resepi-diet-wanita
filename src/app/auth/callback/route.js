// Pautan dalam emel (pengesahan akaun / tetapan semula kata laluan) membawa
// pengguna ke sini dengan ?code=..., yang ditukar menjadi sesi log masuk.
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/auth-utils";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNextPath(searchParams.get("next"), "/profil");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Pautan tamat tempoh atau tidak sah
  return NextResponse.redirect(`${origin}/log-masuk?ralat=pautan`);
}
