// Tetapan Supabase dibaca daripada pemboleh ubah persekitaran (.env.local / Vercel).
// NEXT_PUBLIC_* selamat didedahkan kepada pelayar — ia BUKAN kunci rahsia.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// Membolehkan app terus berjalan (tanpa ciri log masuk) jika belum dikonfigurasi
export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);
