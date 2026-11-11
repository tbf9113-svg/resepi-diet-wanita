import Link from "next/link";

// Halaman 404 tersuai
export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <p className="text-5xl">🍃</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold">
        Resepi tidak ditemui
      </h1>
      <p className="mt-2 text-cocoa-500">
        Maaf, halaman yang anda cari tidak wujud.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-full bg-blush-500 px-5 py-2 text-sm font-medium text-white hover:bg-blush-600"
      >
        Kembali ke laman utama
      </Link>
    </div>
  );
}
