"use client";

import { useState, useCallback } from "react";

const SHARE_URL = "https://kitmaquillage.vercel.app";
const SHARE_TEXT =
  "Je viens de rejoindre la liste d'attente Mon Premier Kit 💄 Rejoins le mouvement ! #MonPremierKit";

export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const textToCopy = `${SHARE_TEXT}\n${SHARE_URL}`;

    try {
      // Essayer le Web Share API d'abord (mobile-first pour TikTok)
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: "Mon Premier Kit",
          text: SHARE_TEXT,
          url: SHARE_URL,
        });
        return;
      }

      // Fallback : copier dans le presse-papiers
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Dernier fallback
      try {
        await navigator.clipboard.writeText(textToCopy);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        // Silently fail
      }
    }
  }, []);

  return (
    <button
      onClick={handleCopy}
      className="label-nav w-full max-w-sm mx-auto min-h-[48px] px-6 py-3 bg-fuchsia text-noir border-0 cursor-pointer transition-colors duration-200 hover:bg-blanc hover:text-noir flex items-center justify-center gap-2"
      type="button"
    >
      {copied ? (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Lien copi&eacute; !
        </>
      ) : (
        <>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            aria-hidden="true"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
          Partager le lien &rarr;
        </>
      )}
    </button>
  );
}
