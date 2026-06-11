"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { subscribeToWaitlist } from "@/modules/marketing/actions";
import { initialFormState } from "@/modules/marketing/types";
import { UnderlineInput } from "@/components/ui/UnderlineInput";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";

export function WaitlistForm() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    subscribeToWaitlist,
    initialFormState
  );

  useEffect(() => {
    if (state.success) {
      // Déclencher l'événement Lead pour les pixels analytics
      window.dispatchEvent(new CustomEvent("trackLead"));

      // Rediriger vers la page de remerciement
      router.push("/merci");
    }
  }, [state.success, router]);

  return (
    <form action={formAction} className="w-full max-w-md mx-auto flex flex-col items-center gap-5">
      <div className="flex flex-col gap-1 w-full text-center">
        <UnderlineInput
          name="email"
          type="email"
          placeholder="Ton adresse e-mail"
          required
          autoComplete="email"
          aria-label="Adresse e-mail"
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          variant="dark"
        />
        {state.errors?.email && (
          <p
            id="email-error"
            className="text-fuchsia text-xs mt-1 m-0"
            role="alert"
          >
            {state.errors.email[0]}
          </p>
        )}
      </div>

      <ButtonPrimary type="submit" disabled={pending}>
        {pending ? "Inscription\u2026" : "Rejoindre la liste d\u2019attente \u2192"}
      </ButtonPrimary>

      {state.message && !state.success && !state.errors?.email && (
        <p className="text-fuchsia text-sm text-center m-0" role="alert">
          {state.message}
        </p>
      )}
    </form>
  );
}
