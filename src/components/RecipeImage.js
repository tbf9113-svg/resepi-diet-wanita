"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Gambar resepi dengan paparan ganti (fallback).
 * - Jika resepi tiada gambar (image: null), ATAU
 * - jika pautan gambar gagal dimuatkan,
 * latar pastel dengan emoji resepi dipaparkan.
 */
export default function RecipeImage({ src, alt, emoji = "🥗", priority = false, sizes }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="absolute inset-0 grid place-items-center bg-gradient-to-br from-blush-100 via-cream-100 to-sage-100"
      >
        <span className="text-6xl drop-shadow-sm sm:text-7xl">{emoji}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className="object-cover"
      onError={() => setHasError(true)}
    />
  );
}
