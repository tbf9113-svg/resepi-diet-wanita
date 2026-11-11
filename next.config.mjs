/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Benarkan telefon/peranti lain dalam rangkaian Wi-Fi yang sama mengakses
  // pelayan dev (npm run dev). Tanpa ini, Next.js menyekat fail JavaScript
  // dan butang tidak berfungsi apabila dibuka melalui alamat IP, cth 192.168.1.5.
  // Nota: hanya memberi kesan semasa pembangunan, bukan di Vercel.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],

  // Benarkan next/image memuatkan gambar dari Unsplash
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
