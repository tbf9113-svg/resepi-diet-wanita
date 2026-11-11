import AuthCard, { AuthLink } from "@/components/auth/AuthCard";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export const metadata = { title: "Lupa Kata Laluan | Resepi Diet Wanita" };

export default function LupaKataLaluanPage() {
  return (
    <AuthCard
      emoji="🔑"
      title="Lupa kata laluan?"
      subtitle="Masukkan emel anda dan kami akan hantar pautan untuk menetapkan semula."
      footer={<AuthLink href="/log-masuk">← Kembali ke log masuk</AuthLink>}
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
