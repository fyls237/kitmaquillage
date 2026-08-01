"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/modules/admin/actions";
import { initialActionState } from "@/modules/admin/types";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { DisplayTitle } from "@/components/ui/DisplayTitle";

export function AdminLoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAdmin,
    initialActionState
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <DisplayTitle
          accent="Espace Admin"
          accentPosition="above"
          as="h1"
        >
          <span className="sr-only">Connexion Espace Admin</span>
        </DisplayTitle>
      </div>

      <form action={formAction} className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-text text-sm font-medium">
            Adresse e-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            required
            autoComplete="email"
            className="
              w-full
              bg-surface text-text
              border border-border
              py-3 px-4
              text-sm leading-normal
              outline-none
              transition-colors duration-200
              placeholder:text-text-muted
              focus:border-accent
              focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
            "
            style={{ borderRadius: "var(--radius-input)" }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-text text-sm font-medium">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            autoComplete="current-password"
            className="
              w-full
              bg-surface text-text
              border border-border
              py-3 px-4
              text-sm leading-normal
              outline-none
              transition-colors duration-200
              placeholder:text-text-muted
              focus:border-accent
              focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
            "
            style={{ borderRadius: "var(--radius-input)" }}
          />
        </div>

        {state.message && (
          <p className="text-error text-sm text-center m-0" role="alert">
            {state.message}
          </p>
        )}

        <ButtonPrimary
          type="submit"
          disabled={pending}
          className="w-full text-lg py-4 mt-2"
        >
          {pending ? "Connexion en cours\u2026" : "Se connecter"}
        </ButtonPrimary>
      </form>
    </div>
  );
}
