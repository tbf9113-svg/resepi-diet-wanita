import { Suspense } from "react";
import AuthCard, { AuthLink } from "@/components/auth/AuthCard";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = { title: "Log Masuk | Resepi Diet Wanita" };

export default function LogMasukPage() {
  return (
    <AuthCard
      emoji="🌸"
      title="Selamat kembali!"
      subtitle="Log masuk untuk meneruskan perjalanan sihat anda."
      footer={<>Belum ada akaun? <AuthLink href="/daftar">Daftar sekarang</AuthLink></>}
    >
      {/* LoginForm membaca ?next= dari URL, jadi perlu Suspense */}
      <Suspense fallback={<div className="h-64" />}>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
