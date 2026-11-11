"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { safeNextPath, translateAuthError } from "@/lib/auth-utils";
import { Field, SubmitButton, Alert } from "./FormParts";

const LINK_ERRORS = {
  pautan: "Pautan emel tidak sah atau telah tamat tempoh. Sila cuba lagi.",
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(LINK_ERRORS[searchParams.get("ralat")] ?? "");

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;
    setLoading(true);
    setError("");

    const form = new FormData(event.currentTarget);
    const { error } = await createClient().auth.signInWithPassword({
      email: form.get("email"),
      password: form.get("password"),
    });

    if (error) {
      setError(translateAuthError(error));
      setLoading(false);
      return;
    }

    // Berjaya — pergi ke halaman asal (jika ada) dan muat semula data pelayan
    router.push(safeNextPath(searchParams.get("next"), "/profil"));
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Alert>{error}</Alert>
      <Field label="Emel" id="email" type="email" autoComplete="email" required placeholder="nama@contoh.com" />
      <Field label="Kata laluan" id="password" type="password" autoComplete="current-password" required />
      <div className="-mt-1 text-right">
        <Link href="/lupa-kata-laluan" className="text-sm text-cocoa-500 hover:text-blush-600">
          Lupa kata laluan?
        </Link>
      </div>
      <SubmitButton loading={loading} loadingText="Sedang log masuk...">
        Log Masuk
      </SubmitButton>
    </form>
  );
}
