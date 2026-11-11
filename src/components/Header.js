import { Suspense } from "react";
import Link from "next/link";
import NavTabs, { TabLinks } from "./NavTabs";
import UserMenu from "./auth/UserMenu";

// Bar navigasi atas — kekal di bahagian atas skrin semasa menatal
export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-cream-200 bg-cream-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-blush-100 text-lg">
            🌸
          </span>
          <span className="hidden font-serif text-xl font-semibold text-cocoa-900 sm:inline">
            Resepi Diet <span className="text-blush-600">Wanita</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Next.js 16 (Cache Components) memerlukan Suspense untuk usePathname */}
          <Suspense fallback={<TabLinks />}>
            <NavTabs />
          </Suspense>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
