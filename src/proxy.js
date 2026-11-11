// Proxy (dahulu "middleware") berjalan sebelum setiap halaman dipaparkan.
// Tugasnya: (1) memperbaharui sesi Supabase, (2) melindungi halaman peribadi.
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Halaman yang memerlukan log masuk
const PROTECTED = ["/profil", "/tukar-kata-laluan"];
// Halaman yang tidak perlu dilihat oleh pengguna yang sudah log masuk
const GUEST_ONLY = ["/log-masuk", "/daftar"];

export async function proxy(request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return NextResponse.next(); // Supabase belum disediakan

  let response = NextResponse.next({ request });

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
        Object.entries(headers ?? {}).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  // PENTING: getUser() mengesahkan token dengan Supabase dan memperbaharuinya jika perlu
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, search } = request.nextUrl;

  if (!user && PROTECTED.some((p) => pathname.startsWith(p))) {
    const loginUrl = new URL("/log-masuk", request.url);
    loginUrl.searchParams.set("next", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (user && GUEST_ONLY.some((p) => pathname.startsWith(p))) {
    return NextResponse.redirect(new URL("/profil", request.url));
  }

  return response;
}

export const config = {
  // Jalankan pada semua halaman KECUALI fail statik dan gambar
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
