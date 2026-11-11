import AuthCard, { AuthLink } from "@/components/auth/AuthCard";
import SignupForm from "@/components/auth/SignupForm";

export const metadata = { title: "Daftar | Resepi Diet Wanita" };

export default function DaftarPage() {
  return (
    <AuthCard
      emoji="✨"
      title="Cipta akaun percuma"
      subtitle="Sertai komuniti wanita yang mahu hidup lebih sihat."
      footer={<>Sudah ada akaun? <AuthLink href="/log-masuk">Log masuk</AuthLink></>}
    >
      <SignupForm />
    </AuthCard>
  );
}
