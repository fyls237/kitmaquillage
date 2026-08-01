"use client";

import { useActionState } from "react";
import { activateAccount } from "@/modules/academy/actions";
import { initialActionState } from "@/modules/academy/types";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

interface ActivationFormProps {
  token: string;
}

export function ActivationForm({ token }: ActivationFormProps) {
  const [state, formAction, pending] = useActionState(
    activateAccount,
    initialActionState
  );

  return (
    <form action={formAction} className="flex flex-col gap-6 w-full max-w-sm mx-auto">
      {/* Champ caché pour le token */}
      <input type="hidden" name="token" value={token} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="firstName" className="text-text text-sm font-medium">
          Ton prénom
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          placeholder="ex: Sarah"
          required
          autoComplete="given-name"
          className="
            w-full bg-surface text-text border border-border
            py-3 px-4 text-sm leading-normal outline-none
            transition-colors duration-200 placeholder:text-text-muted
            focus:border-accent focus-visible:outline-2
            focus-visible:outline-accent focus-visible:outline-offset-2
          "
          style={{ borderRadius: "var(--radius-input)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-text text-sm font-medium">
          Ton adresse e-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="sarah@example.com"
          required
          autoComplete="email"
          className="
            w-full bg-surface text-text border border-border
            py-3 px-4 text-sm leading-normal outline-none
            transition-colors duration-200 placeholder:text-text-muted
            focus:border-accent focus-visible:outline-2
            focus-visible:outline-accent focus-visible:outline-offset-2
          "
          style={{ borderRadius: "var(--radius-input)" }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-text text-sm font-medium">
          Mot de passe (8 caractères minimum)
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
          autoComplete="new-password"
          className="
            w-full bg-surface text-text border border-border
            py-3 px-4 text-sm leading-normal outline-none
            transition-colors duration-200 placeholder:text-text-muted
            focus:border-accent focus-visible:outline-2
            focus-visible:outline-accent focus-visible:outline-offset-2
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
        {pending ? "Activation en cours\u2026" : "Créer mon compte"}
      </ButtonPrimary>
      
      <p className="text-xs text-text-muted text-center mt-2">
        En créant ton compte, tu acceptes les Conditions Générales de Vente et notre politique de confidentialité.
      </p>
    </form>
  );
}
