"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

export default function ActivateManualPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      // Nettoyage basique pour éviter les espaces
      const cleanCode = code.trim().toUpperCase();
      router.push(`/activate/${cleanCode}`);
    }
  };

  return (
    <div className="min-h-dvh bg-bg flex flex-col items-center py-12 px-4 sm:px-6">
      <div className="text-center mb-8 max-w-md">
        <DisplayTitle
          accent="Ton code"
          accentPosition="above"
          as="h1"
        >
          <span className="sr-only">Saisis ton code</span>
        </DisplayTitle>
        <p className="text-text-muted mt-4">
          Si tu n'arrives pas à scanner le QR Code, saisis le code d'activation (ex: TG-4K9P) indiqué juste en dessous.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-sm mx-auto">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="code" className="text-text text-sm font-medium">
            Code d'activation
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="TG-XXXX"
            required
            className="
              w-full bg-surface text-text border border-border
              py-3 px-4 text-center text-xl tracking-widest font-mono uppercase outline-none
              transition-colors duration-200 placeholder:text-text-muted
              focus:border-accent focus-visible:outline-2
              focus-visible:outline-accent focus-visible:outline-offset-2
            "
            style={{ borderRadius: "var(--radius-input)" }}
          />
        </div>

        <ButtonPrimary
          type="submit"
          disabled={!code.trim()}
          className="w-full text-lg py-4 mt-2"
        >
          Continuer
        </ButtonPrimary>
      </form>
    </div>
  );
}
