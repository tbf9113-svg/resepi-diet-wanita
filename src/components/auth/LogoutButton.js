"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await createClient().auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="rounded-full border border-blush-200 px-5 py-2.5 text-sm font-semibold text-blush-600 transition hover:bg-blush-50 disabled:opacity-60"
    >
      {loading ? "Sedang log keluar..." : "Log Keluar"}
    </button>
  );
}
