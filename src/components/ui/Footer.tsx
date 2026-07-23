import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-bg border-t border-border py-12 px-4 sm:px-6" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8">
          {/* Logo */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <Link href="/" className="no-underline flex items-center" aria-label="TON GLOW — Accueil">
              <span className="accent-script" style={{ fontSize: "48px", lineHeight: 1 }}>
                <span className="text-text">Ton</span> <span className="text-accent">glow</span>
              </span>
            </Link>
            <p className="text-text-muted text-sm m-0 text-center sm:text-left">
              Le kit qui t&apos;apprend à te maquiller.
            </p>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-4">
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200"
              aria-label="TikTok"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>

        {/* Séparateur + mentions */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-text-muted text-xs m-0">
            © {new Date().getFullYear()} TON GLOW — Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
