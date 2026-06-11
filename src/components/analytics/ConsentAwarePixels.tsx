"use client";

import { useEffect, useRef } from "react";
import { initAllPixels, trackLead } from "@/lib/analytics";

/**
 * Composant consent-aware qui charge les pixels analytics
 * uniquement après consentement explicite de l'utilisateur.
 * Aucun script de tracking ne se lance avant le clic sur "Accepter".
 */
export function ConsentAwarePixels() {
  const pixelsInitialized = useRef(false);

  useEffect(() => {
    // Vérifier si le consentement existe déjà (cookie)
    const existingConsent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("consent_mode="))
      ?.split("=")[1];

    if (existingConsent === "granted" && !pixelsInitialized.current) {
      pixelsInitialized.current = true;
      initAllPixels();
    }

    // Écouter les mises à jour du consentement
    function handleConsentUpdate(event: Event) {
      const detail = (event as CustomEvent).detail;
      if (
        detail?.consent === "granted" &&
        !pixelsInitialized.current
      ) {
        pixelsInitialized.current = true;
        initAllPixels();
      }
    }

    // Écouter les événements de conversion (Lead)
    function handleTrackLead() {
      if (pixelsInitialized.current) {
        trackLead();
      }
    }

    window.addEventListener("consentUpdate", handleConsentUpdate);
    window.addEventListener("trackLead", handleTrackLead);

    return () => {
      window.removeEventListener("consentUpdate", handleConsentUpdate);
      window.removeEventListener("trackLead", handleTrackLead);
    };
  }, []);

  // Ce composant ne rend rien visuellement
  return null;
}
