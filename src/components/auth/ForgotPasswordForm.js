"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { translateAuthError } from "@/lib/auth-utils";
import { Field, SubmitButton, Alert } from "./FormParts";

export default function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!isSupabaseConfigured) return;
    setLoading(true);
    setError("");

    const email = new FormData(event.currentTarget).get("email").trim();
    const { error } = await createClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/tukar-kata-laluan`,
    });
    setLoading(false);

    if (error) setError(translateAuthError(error));
    else setSent(true);
  }

  if (sent) {
    return (
      <Alert type="success">
        Jika emel tersebut berdaftar, pautan untuk menetapkan semula kata laluan telah dihantar.
        Semak peti masuk anda.
      </Alert>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Alert>{error}</Alert>
      <Field label="Emel" id="email" type="email" autoComplete="email" required placeholder="nama@contoh.com" />
      <SubmitButton loading={loading} loadingText="Sedang menghantar...">
        Hantar Pautan
      </SubmitButton>
    </form>
  );
}
