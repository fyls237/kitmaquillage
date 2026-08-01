"use client";

import { useActionState } from "react";
import { changePassword } from "@/modules/admin/actions";
import { initialActionState } from "@/modules/admin/types";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

export function ChangePasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePassword,
    initialActionState
  );

  return (
    <form action={formAction} className="flex flex-col gap-6 max-w-sm">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="oldPassword" className="text-text text-sm font-medium">
          Ancien mot de passe
        </label>
        <input
          id="oldPassword"
          name="oldPassword"
          type="password"
          required
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
        <label htmlFor="newPassword" className="text-text text-sm font-medium">
          Nouveau mot de passe
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
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
        <label htmlFor="confirmPassword" className="text-text text-sm font-medium">
          Confirmer le nouveau mot de passe
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
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
        <p
          className={`text-sm ${
            state.success ? "text-accent" : "text-error"
          } m-0`}
          role="alert"
        >
          {state.message}
        </p>
      )}

      <ButtonPrimary
        type="submit"
        disabled={pending}
        className="w-full text-base py-3"
      >
        {pending ? "Enregistrement\u2026" : "Mettre à jour le mot de passe"}
      </ButtonPrimary>
    </form>
  );
}
