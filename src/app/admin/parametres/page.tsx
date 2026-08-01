import { ChangePasswordForm } from "@/modules/admin/components/ChangePasswordForm";
import { logoutAdmin } from "@/modules/admin/actions";

export const metadata = {
  title: "Paramètres Admin — TON GLOW",
  robots: { index: false, follow: false },
};

export default function AdminSettingsPage() {
  return (
    <div className="min-h-dvh bg-bg">
      {/* Header Admin avec lien retour */}
      <header className="bg-surface border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a
              href="/admin"
              className="text-accent hover:text-accent-hover transition-colors"
              aria-label="Retour"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </a>
            <h1 className="text-xl font-bold text-text m-0">Paramètres</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-lg font-bold text-text mb-6">Changer de mot de passe</h2>
          <ChangePasswordForm />
        </section>

        <section className="pt-8 border-t border-border">
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="text-error font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              Se déconnecter
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
