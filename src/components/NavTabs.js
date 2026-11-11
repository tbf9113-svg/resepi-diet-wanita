"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Resepi", icon: "🥗", match: (p) => p === "/" || p.startsWith("/resepi") },
  { href: "/senaman", label: "Senaman", icon: "🏃‍♀️", match: (p) => p.startsWith("/senaman") },
];

/**
 * Tab navigasi utama. `pathname` boleh kosong semasa prerender
 * (lihat Suspense dalam Header), jadi tiada tab ditanda aktif ketika itu.
 */
export function TabLinks({ pathname = "" }) {
  return (
    <nav aria-label="Navigasi utama" className="flex gap-1 rounded-full bg-cream-100 p-1">
      {TABS.map((tab) => {
        const isActive = pathname !== "" && tab.match(pathname);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition sm:px-4 ${
              isActive
                ? "bg-white text-blush-600 shadow-sm"
                : "text-cocoa-500 hover:text-cocoa-900"
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function NavTabs() {
  const pathname = usePathname();
  return <TabLinks pathname={pathname} />;
}
