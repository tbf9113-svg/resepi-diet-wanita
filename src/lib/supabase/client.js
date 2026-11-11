// Klien Supabase untuk Client Components (pelayar).
// Sesi disimpan dalam cookie supaya pelayan juga boleh membacanya.
import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_KEY } from "./config";

let client;

export function createClient() {
  // Guna semula satu klien sahaja dalam pelayar
  client ??= createBrowserClient(SUPABASE_URL, SUPABASE_KEY);
  return client;
}
