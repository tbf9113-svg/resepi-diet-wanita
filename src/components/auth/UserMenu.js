"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Butang di header: "Log Masuk" untuk pelawat, atau huruf awal nama
 * pengguna (pautan ke profil) jika sudah log masuk.
 * Dibaca di pelayar supaya halaman lain kekal statik dan laju.
 */
export default function UserMenu() {
  const [user, setUser] = useState(undefined); // undefined = sedang memuatkan

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    const supabase = createClient();

    // Dengar perubahan log masuk / log keluar (termasuk sesi sedia ada)
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  if (isSupabaseConfigured && user === undefined) {
    return <span className="h-9 w-9 flex-none animate-pulse rounded-full bg-cream-200" />;
  }

  if (!user) {
    return (
      <Link
        href="/log-masuk"
        aria-label="Log masuk"
        className="grid h-9 w-9 flex-none place-items-center rounded-full bg-blush-500 text-sm font-semibold text-white transition hover:bg-blush-600 sm:w-auto sm:px-4"
      >
        <span className="sm:hidden">👤</span>
        <span className="hidden sm:inline">Log Masuk</span>
      </Link>
    );
  }

  const name = user.user_metadata?.full_name || user.email;
  return (
    <Link
      href="/profil"
      aria-label="Profil saya"
      title={name}
      className="grid h-9 w-9 flex-none place-items-center rounded-full bg-sage-200 font-semibold text-sage-700 ring-2 ring-white transition hover:bg-sage-100"
    >
      {name.charAt(0).toUpperCase()}
    </Link>
  );
}
