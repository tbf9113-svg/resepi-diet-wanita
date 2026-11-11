import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase/config";

// Bingkai kad untuk semua halaman log masuk / daftar
export default function AuthCard({ emoji, title, subtitle, children, footer }) {
  return (
    <div className="mx-auto w-full max-w-md px-4 py-10 sm:py-16">
      <div className="rounded-3xl border border-cream-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-blush-100 text-2xl">
            {emoji}
          </span>
          <h1 className="mt-4 font-serif text-2xl font-semibold text-cocoa-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-cocoa-500">{subtitle}</p>}
        </div>

        {!isSupabaseConfigured && (
          <p className="mt-6 rounded-2xl bg-cream-100 p-4 text-sm text-cocoa-700">
            ⚠️ Supabase belum disediakan. Isikan <code>.env.local</code> dan mulakan semula
            pelayan (lihat panduan persediaan).
          </p>
        )}

        <div className="mt-6">{children}</div>
      </div>
      {footer && <div className="mt-6 text-center text-sm text-cocoa-500">{footer}</div>}
    </div>
  );
}

// Pautan kecil gaya seragam untuk bahagian bawah kad
export function AuthLink({ href, children }) {
  return (
    <Link href={href} className="font-semibold text-blush-600 hover:text-blush-700">
      {children}
    </Link>
  );
}
