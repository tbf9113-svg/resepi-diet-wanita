"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { translateAuthError } from "@/lib/auth-utils";
import { Field, SubmitButton, Alert } from "./FormParts";

export default function UpdatePasswordForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const password = form.get("password");

    if (password.length < 6) return setError("Kata laluan mesti sekurang-kurangnya 6 aksara.");
    if (password !== form.get("confirm")) return setError("Kata laluan tidak sepadan.");

    setLoading(true);
    const { error } = await createClient().auth.updateUser({ password });
    setLoading(false);

    if (error) return setError(translateAuthError(error));
    router.push("/profil?dikemas=1");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Alert>{error}</Alert>
      <Field label="Kata laluan baharu" id="password" type="password" autoComplete="new-password" required />
      <Field label="Sahkan kata laluan baharu" id="confirm" type="password" autoComplete="new-password" required />
      <SubmitButton loading={loading} loadingText="Sedang menyimpan...">
        Simpan Kata Laluan
      </SubmitButton>
    </form>
  );
}
