"use client";

import { useActionState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { submitOrder } from "@/modules/orders/actions";
import { initialOrderFormState } from "@/modules/orders/types";
import { ButtonPrimary } from "@/components/ui/ButtonPrimary";
import { OrderSummaryBar } from "./OrderSummaryBar";

export function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const carnation = searchParams.get("carnation") ?? "";
  const fondDeTeint = searchParams.get("fond") ?? "";
  const antiCernes = searchParams.get("cernes") ?? "";

  const [state, formAction, pending] = useActionState(
    submitOrder,
    initialOrderFormState
  );

  useEffect(() => {
    if (state.success && state.orderNumber) {
      router.push(`/commande/merci?order=${state.orderNumber}`);
    }
  }, [state.success, state.orderNumber, router]);

  // Si aucune teinte n'est sélectionnée, proposer de revenir au sélecteur
  if (!carnation || !fondDeTeint || !antiCernes) {
    return (
      <div className="text-center py-12">
        <p className="text-text-muted text-lg mb-6">
          Tu n&apos;as pas encore choisi tes teintes.
        </p>
        <a
          href="/kit#selecteur-teinte"
          className="
            inline-flex items-center justify-center gap-2
            min-h-[48px] px-8 py-3
            bg-accent text-white
            font-semibold text-base no-underline
            transition-all duration-200 ease-out
            hover:bg-accent-hover
          "
          style={{ borderRadius: "var(--radius-button)" }}
        >
          Choisir mes teintes
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Récapitulatif des teintes */}
      <OrderSummaryBar
        carnation={carnation}
        fondDeTeint={fondDeTeint}
        antiCernes={antiCernes}
      />

      {/* Formulaire */}
      <form action={formAction} className="flex flex-col gap-6">
        {/* Hidden inputs pour les teintes */}
        <input type="hidden" name="carnation" value={carnation} />
        <input type="hidden" name="fondDeTeint" value={fondDeTeint} />
        <input type="hidden" name="antiCernes" value={antiCernes} />

        {/* Prénom + Nom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="firstName"
            label="Prénom"
            type="text"
            placeholder="Ton prénom"
            required
            autoComplete="given-name"
            error={state.errors?.firstName?.[0]}
          />
          <FormField
            name="lastName"
            label="Nom"
            type="text"
            placeholder="Ton nom"
            required
            autoComplete="family-name"
            error={state.errors?.lastName?.[0]}
          />
        </div>

        {/* Email */}
        <FormField
          name="email"
          label="Adresse e-mail"
          type="email"
          placeholder="ton@email.com"
          required
          autoComplete="email"
          error={state.errors?.email?.[0]}
        />

        {/* Téléphone */}
        <FormField
          name="phone"
          label="Téléphone"
          type="tel"
          placeholder="06 12 34 56 78"
          required
          autoComplete="tel"
          error={state.errors?.phone?.[0]}
          hint="Nous te contacterons par téléphone pour organiser la remise."
        />

        {/* Ville + Code postal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            name="city"
            label="Ville"
            type="text"
            placeholder="Ta ville"
            required
            autoComplete="address-level2"
            error={state.errors?.city?.[0]}
          />
          <FormField
            name="postalCode"
            label="Code postal"
            type="text"
            placeholder="75001"
            autoComplete="postal-code"
          />
        </div>

        {/* Message facultatif */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-text text-sm font-medium"
          >
            Un message pour nous ?{" "}
            <span className="text-text-muted font-normal">(facultatif)</span>
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Ex. : Je suis dispo le samedi en général…"
            rows={3}
            maxLength={500}
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
              resize-none
            "
            style={{ borderRadius: "var(--radius-input)" }}
          />
        </div>

        {/* Séparateur */}
        <div className="w-full h-px bg-border" aria-hidden="true" />

        {/* Cases à cocher */}
        <div className="flex flex-col gap-4">
          <CheckboxField
            name="cgv"
            required
            error={state.errors?.cgv?.[0]}
          >
            J&apos;accepte les{" "}
            <a
              href="/cgv"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline hover:text-accent-hover"
            >
              conditions générales de vente
            </a>
          </CheckboxField>

          <CheckboxField name="newsletter">
            Je souhaite recevoir les nouveautés TON GLOW
          </CheckboxField>
        </div>

        {/* Erreur globale */}
        {state.message && !state.success && !state.errors && (
          <p className="text-error text-sm text-center m-0" role="alert">
            {state.message}
          </p>
        )}

        {/* Bouton de soumission */}
        <ButtonPrimary
          type="submit"
          disabled={pending}
          className="w-full text-lg py-4 mt-2"
        >
          {pending ? "Envoi en cours\u2026" : "Valider ma commande"}
        </ButtonPrimary>

        <p className="text-text-muted text-xs text-center m-0">
          Aucun paiement en ligne. Nous te contacterons sous 24&nbsp;h
          pour organiser la remise en main propre.
        </p>
      </form>
    </div>
  );
}

// ── Composants locaux ──────────────────────────────────────────

function FormField({
  name,
  label,
  type = "text",
  placeholder,
  required,
  autoComplete,
  error,
  hint,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-text text-sm font-medium">
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        aria-describedby={
          error ? `${name}-error` : hint ? `${name}-hint` : undefined
        }
        className={`
          w-full
          bg-surface text-text
          border ${error ? "border-error" : "border-border"}
          py-3 px-4
          text-sm leading-normal
          outline-none
          transition-colors duration-200
          placeholder:text-text-muted
          focus:border-accent
          focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
        `}
        style={{ borderRadius: "var(--radius-input)" }}
      />
      {hint && !error && (
        <p
          id={`${name}-hint`}
          className="text-text-muted text-xs m-0"
        >
          {hint}
        </p>
      )}
      {error && (
        <p
          id={`${name}-error`}
          className="text-error text-xs m-0"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function CheckboxField({
  name,
  required,
  error,
  children,
}: {
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          name={name}
          required={required}
          className="
            mt-0.5 w-5 h-5 flex-shrink-0
            appearance-none
            bg-surface border border-border
            cursor-pointer
            checked:bg-accent checked:border-accent
            transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
          "
          style={{ borderRadius: "4px" }}
        />
        <span className="text-text text-sm leading-relaxed">
          {children}
        </span>
      </label>
      {error && (
        <p className="text-error text-xs m-0 ml-8" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
