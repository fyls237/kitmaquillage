import type { Metadata } from "next";
import { AdminLoginForm } from "@/modules/admin/components/AdminLoginForm";

export const metadata: Metadata = {
  title: "Connexion Admin — TON GLOW",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-dvh bg-bg flex items-center justify-center px-4 sm:px-6 py-12">
      <AdminLoginForm />
    </div>
  );
}
