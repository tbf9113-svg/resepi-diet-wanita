// Klien Supabase untuk Server Components dan Route Handlers.
// Cipta klien BARU untuk setiap permintaan — jangan kongsi antara pengguna.
import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_KEY } from "./config";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component tidak boleh menulis cookie — tidak mengapa,
          // proxy.js sudah memperbaharui sesi sebelum halaman dipaparkan.
        }
      },
    },
  });
}
