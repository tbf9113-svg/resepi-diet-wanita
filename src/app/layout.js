import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

// Fon sans-serif untuk teks biasa
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

// Fon serif yang elegan untuk tajuk
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata = {
  title: "Resepi Diet Wanita",
  description:
    "Koleksi resepi diet sihat, rendah kalori dan mudah disediakan untuk wanita.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ms" className={`${jakarta.variable} ${fraunces.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
