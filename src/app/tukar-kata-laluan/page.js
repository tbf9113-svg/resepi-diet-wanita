import AuthCard from "@/components/auth/AuthCard";
import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";

export const metadata = { title: "Tukar Kata Laluan | Resepi Diet Wanita" };

// Dilindungi oleh proxy.js — hanya pengguna yang log masuk boleh sampai ke sini
export default function TukarKataLaluanPage() {
  return (
    <AuthCard emoji="🔒" title="Tetapkan kata laluan baharu">
      <UpdatePasswordForm />
    </AuthCard>
  );
}
