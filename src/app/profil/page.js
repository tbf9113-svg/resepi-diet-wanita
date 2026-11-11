import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import LogoutButton from "@/components/auth/LogoutButton";

export const metadata = { title: "Profil Saya | Resepi Diet Wanita" };

// Halaman profil — dibaca di pelayar, jadi bahagian pengguna dibalut Suspense
export default function ProfilPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-16">
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}

async function ProfileContent() {
  if (!isSupabaseConfigured) redirect("/log-masuk");

  // Sentiasa sahkan pengguna di pelayan — jangan bergantung pada pelayar sahaja
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/log-masuk?next=/profil");

  const name = user.user_metadata?.full_name || "Pengguna";
  const joined = new Date(user.created_at).toLocaleDateString("ms-MY", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-br from-blush-100 via-cream-100 to-sage-100 p-6 text-center sm:p-10">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-3xl font-semibold text-blush-600 shadow-sm">
          {name.charAt(0).toUpperCase()}
        </span>
        <h1 className="mt-4 font-serif text-3xl font-semibold text-cocoa-900">Hai, {name}! 👋</h1>
        <p className="mt-1 text-cocoa-500">{user.email}</p>
        <p className="mt-1 text-xs text-cocoa-500">Ahli sejak {joined}</p>
      </section>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <Link href="/" className="rounded-3xl border border-cream-200 bg-white p-5 hover:border-blush-200">
          <p className="text-2xl">🥗</p>
          <p className="mt-2 font-serif text-lg font-semibold">Terokai Resepi</p>
          <p className="text-sm text-cocoa-500">Cari hidangan sihat untuk hari ini.</p>
        </Link>
        <Link href="/senaman" className="rounded-3xl border border-cream-200 bg-white p-5 hover:border-blush-200">
          <p className="text-2xl">🏃‍♀️</p>
          <p className="mt-2 font-serif text-lg font-semibold">Mula Bersenam</p>
          <p className="text-sm text-cocoa-500">Pilih senaman mengikut tahap anda.</p>
        </Link>
      </section>

      <section className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-cream-200 bg-white p-5">
        <Link href="/tukar-kata-laluan" className="text-sm font-medium text-cocoa-700 hover:text-blush-600">
          🔒 Tukar kata laluan
        </Link>
        <LogoutButton />
      </section>
    </>
  );
}

function ProfileSkeleton() {
  return <div className="h-64 animate-pulse rounded-3xl bg-cream-100" />;
}
