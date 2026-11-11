"use client";

// Input carian terkawal (controlled) — nilai disimpan oleh komponen induk
export default function SearchBar({
  value,
  onChange,
  placeholder = "Cari resepi, cth: salmon, oats...",
}) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cocoa-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="w-full rounded-full border border-cream-200 bg-white py-3.5 pl-12 pr-5 text-cocoa-900 shadow-sm outline-none transition placeholder:text-cocoa-500/70 focus:border-blush-300 focus:ring-4 focus:ring-blush-100"
      />
    </div>
  );
}
