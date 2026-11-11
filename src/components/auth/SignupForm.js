"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { translateAuthError } from "@/lib/auth-utils";
import { Field, SubmitButton, Alert } from "./FormParts";

const MIN_PASSWORD = 6; // sama dengan tetapan lalai Supabase

export default function SignupForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState(""); // emel yang menerima pautan pengesahan

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;
    setError("");

    const form = new FormData(event.currentTarget);
    const name = form.get("name").trim();
    const email = form.get("email").trim();
    const password = form.get("password");

    // Semakan ringkas di pelayar sebelum menghantar
    if (password.length < MIN_PASSWORD) {
      setError(`Kata laluan mesti sekurang-kurangnya ${MIN_PASSWORD} aksara.`);
      return;
    }
    if (password !== form.get("confirm")) {
      setError("Kata laluan tidak sepadan.");
      return;
    }

    setLoading(true);
    const { data, error } = await createClient().auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }, // disimpan dalam user_metadata
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/profil`,
      },
    });
    setLoading(false);

    if (error) {
      setError(translateAuthError(error));
      return;
    }

    // Supabase memulangkan identities kosong jika emel sudah wujud
    if (data.user && data.user.identities?.length === 0) {
      setError("Emel ini sudah didaftarkan. Sila log masuk.");
      return;
    }

    if (data.session) {
      // "Confirm email" dimatikan dalam Supabase → terus log masuk
      router.push("/profil");
      router.refresh();
    } else {
      setSentTo(email);
    }
  }

  if (sentTo) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <p className="text-5xl">📬</p>
        <Alert type="success">
          Hampir siap! Kami telah menghantar pautan pengesahan ke <strong>{sentTo}</strong>.
          Klik pautan tersebut untuk mengaktifkan akaun anda.
        </Alert>
        <p className="text-xs text-cocoa-500">Tidak menerima emel? Semak folder spam.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Alert>{error}</Alert>
      <Field label="Nama penuh" id="name" autoComplete="name" required placeholder="Siti Aminah" />
      <Field label="Emel" id="email" type="email" autoComplete="email" required placeholder="nama@contoh.com" />
      <Field
        label={`Kata laluan (min. ${MIN_PASSWORD} aksara)`}
        id="password"
        type="password"
        autoComplete="new-password"
        required
      />
      <Field label="Sahkan kata laluan" id="confirm" type="password" autoComplete="new-password" required />
      <SubmitButton loading={loading} loadingText="Sedang mendaftar...">
        Daftar Akaun
      </SubmitButton>
    </form>
  );
}
