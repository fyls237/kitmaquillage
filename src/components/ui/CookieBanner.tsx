"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_COOKIE_NAME = "consent_mode";
const CONSENT_DURATION_DAYS = 395; // ~13 mois, conformité RGPD

type ConsentState = "pending" | "granted" | "denied";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(^| )" + name + "=([^;]+)")
  );
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax;Secure`;
}

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getCookie(CONSENT_COOKIE_NAME);
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
      // Dispatch event for existing consent
      window.dispatchEvent(
        new CustomEvent("consentUpdate", { detail: { consent: stored } })
      );
    } else {
      setVisible(true);
    }
  }, []);

  const handleConsent = useCallback((decision: "granted" | "denied") => {
    setCookie(CONSENT_COOKIE_NAME, decision, CONSENT_DURATION_DAYS);
    setConsent(decision);
    setVisible(false);
    window.dispatchEvent(
      new CustomEvent("consentUpdate", { detail: { consent: decision } })
    );
  }, []);

  if (!visible || consent !== "pending") return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 bg-noir border-t border-solid border-filet-sombre"
      role="dialog"
      aria-label="Gestion des cookies"
      aria-modal="false"
    >
      <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-blanc/80 text-sm leading-relaxed m-0 max-w-xl">
          Nous utilisons des cookies pour mesurer l&apos;audience et améliorer
          ton expérience. Aucun tracking publicitaire ne sera activé sans ton
          consentement.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => handleConsent("denied")}
            className="label-nav min-h-[44px] px-5 py-2 bg-transparent text-blanc/60 border border-solid border-blanc/20 cursor-pointer transition-colors duration-200 hover:border-blanc/50 hover:text-blanc"
            type="button"
          >
            Refuser
          </button>
          <button
            onClick={() => handleConsent("granted")}
            className="label-nav min-h-[44px] px-5 py-2 bg-fuchsia text-noir border-0 cursor-pointer transition-colors duration-200 hover:bg-blanc hover:text-noir"
            type="button"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}
