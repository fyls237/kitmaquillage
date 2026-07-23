"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border"
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="no-underline flex items-center" aria-label="TON GLOW — Accueil">
          <span className="accent-script" style={{ fontSize: "42px", lineHeight: 1 }}>
            <span className="text-text">Ton</span> <span className="text-accent">glow</span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden sm:flex items-center gap-8" aria-label="Navigation principale">
          <Link href="/" className="label-nav text-text-muted hover:text-text transition-colors duration-200 no-underline">
            Accueil
          </Link>
          <Link href="/kit" className="label-nav text-text-muted hover:text-text transition-colors duration-200 no-underline">
            Le kit
          </Link>
        </nav>

        {/* Menu hamburger mobile */}
        <button
          className="sm:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 bg-transparent border-0 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span
            className={`block w-5 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-1" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-text transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`}
          />
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="sm:hidden bg-bg border-t border-border px-4 py-6 flex flex-col gap-4"
          aria-label="Navigation mobile"
        >
          <Link
            href="/"
            className="label-nav text-text-muted hover:text-text transition-colors duration-200 no-underline py-2"
            onClick={() => setMenuOpen(false)}
          >
            Accueil
          </Link>
          <Link
            href="/kit"
            className="label-nav text-text-muted hover:text-text transition-colors duration-200 no-underline py-2"
            onClick={() => setMenuOpen(false)}
          >
            Le kit
          </Link>
        </nav>
      )}
    </header>
  );
}
