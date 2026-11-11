// Fungsi kecil yang dikongsi oleh borang log masuk / daftar.

/**
 * Hanya benarkan laluan dalaman (cth "/profil") sebagai destinasi selepas log masuk,
 * supaya pautan ?next=https://laman-jahat.com tidak boleh digunakan.
 */
export function safeNextPath(next, fallback = "/") {
  if (typeof next === "string" && next.startsWith("/") && !next.startsWith("//")) {
    return next;
  }
  return fallback;
}

// Terjemah mesej ralat Supabase ke Bahasa Melayu
const ERRORS = {
  invalid_credentials: "Emel atau kata laluan tidak betul.",
  email_not_confirmed: "Sila sahkan emel anda dahulu. Semak peti masuk (dan folder spam).",
  user_already_exists: "Emel ini sudah didaftarkan. Sila log masuk.",
  email_exists: "Emel ini sudah didaftarkan. Sila log masuk.",
  weak_password: "Kata laluan terlalu lemah. Gunakan sekurang-kurangnya 6 aksara.",
  over_email_send_rate_limit: "Terlalu banyak emel dihantar. Sila cuba lagi selepas beberapa minit.",
  over_request_rate_limit: "Terlalu banyak cubaan. Sila tunggu sebentar.",
  same_password: "Kata laluan baharu mesti berbeza daripada kata laluan lama.",
  validation_failed: "Sila semak maklumat yang dimasukkan.",
  email_address_invalid: "Alamat emel tidak sah.",
};

export function translateAuthError(error) {
  if (!error) return "";
  if (error.code && ERRORS[error.code]) return ERRORS[error.code];
  if (error.message?.includes("fetch")) {
    return "Tidak dapat menghubungi pelayan. Semak sambungan internet anda.";
  }
  return "Maaf, berlaku ralat. Sila cuba lagi.";
}
