"use client";

import { useState } from "react";
import { CarnationPicker } from "./CarnationPicker";
import { ShadePicker } from "./ShadePicker";
import { SelectionSummary } from "./SelectionSummary";
import teintesData from "@/data/teintes.json";

export type CarnationId = "claire" | "medium" | "tan" | "profonde";

export interface Shade {
  id: string;
  nom: string;
  sousTon: string;
  image: string;
}

export interface Selection {
  carnation: CarnationId | null;
  fondDeTeint: string | null;
  antiCernes: string | null;
}

export function SkinToneSelector() {
  const [selection, setSelection] = useState<Selection>({
    carnation: null,
    fondDeTeint: null,
    antiCernes: null,
  });

  const { carnations, teintes, correspondances } = teintesData;

  // Quand la carnation change, on réinitialise fond de teint et anti-cernes
  const handleCarnationSelect = (id: CarnationId) => {
    setSelection({
      carnation: id,
      fondDeTeint: null,
      antiCernes: null,
    });
  };

  // Récupère les teintes compatibles avec la carnation sélectionnée
  const getCompatibleShades = (type: "fond" | "cernes"): Shade[] => {
    if (!selection.carnation) return [];

    const compatibleIds = correspondances[selection.carnation]?.[type] ?? [];
    return teintes[type].filter((t) => compatibleIds.includes(t.id));
  };

  // Trouver les infos complètes de la teinte sélectionnée
  const getSelectedShade = (type: "fond" | "cernes"): Shade | null => {
    const selectedId = type === "fond" ? selection.fondDeTeint : selection.antiCernes;
    if (!selectedId) return null;
    return teintes[type].find((t) => t.id === selectedId) ?? null;
  };

  // Calculer l'étape actuelle
  const currentStep = !selection.carnation ? 1 : !selection.fondDeTeint ? 2 : !selection.antiCernes ? 3 : 4;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Barre de progression */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`
                w-8 h-8 flex items-center justify-center text-sm font-semibold
                transition-all duration-200
                ${
                  step < currentStep
                    ? "bg-accent text-white"
                    : step === currentStep
                    ? "bg-accent text-white shadow-glow"
                    : "bg-surface text-text-muted border border-border"
                }
              `}
              style={{ borderRadius: "50%" }}
            >
              {step < currentStep ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                step
              )}
            </div>
            {step < 3 && (
              <div
                className={`w-12 sm:w-20 h-0.5 transition-colors duration-200 ${
                  step < currentStep ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Étape 1 : Carnation */}
      <section className="mb-12">
        <div className="text-center mb-6">
          <span className="eyebrow text-accent block mb-2">Étape 1</span>
          <h3 className="text-text text-xl sm:text-2xl font-bold m-0">
            Quelle est ta carnation ?
          </h3>
          <p className="text-text-muted text-sm mt-2 m-0">
            Choisis celle qui se rapproche le plus de ta couleur de peau naturelle.
          </p>
        </div>
        <CarnationPicker
          carnations={carnations}
          selected={selection.carnation}
          onSelect={handleCarnationSelect}
        />
      </section>

      {/* Étape 2 : Fond de teint (visible seulement si carnation choisie) */}
      {selection.carnation && (
        <section className="mb-12" style={{ animation: "fadeInUp 400ms ease-out" }}>
          <div className="text-center mb-6">
            <span className="eyebrow text-accent block mb-2">Étape 2</span>
            <h3 className="text-text text-xl sm:text-2xl font-bold m-0">
              Choisis ton fond de teint
            </h3>
            <p className="text-text-muted text-sm mt-2 m-0">
              ELF Soft Glam — Teintes adaptées à ta carnation
            </p>
          </div>
          <ShadePicker
            shades={getCompatibleShades("fond")}
            selected={selection.fondDeTeint}
            onSelect={(id) =>
              setSelection((prev) => ({ ...prev, fondDeTeint: id, antiCernes: null }))
            }
            type="fond"
          />
        </section>
      )}

      {/* Étape 3 : Anti-cernes (visible seulement si fond de teint choisi) */}
      {selection.fondDeTeint && (
        <section className="mb-12" style={{ animation: "fadeInUp 400ms ease-out" }}>
          <div className="text-center mb-6">
            <span className="eyebrow text-accent block mb-2">Étape 3</span>
            <h3 className="text-text text-xl sm:text-2xl font-bold m-0">
              Choisis ton anti-cernes
            </h3>
            <p className="text-text-muted text-sm mt-2 m-0">
              Essence — Correcteur adapté à ta carnation
            </p>
          </div>
          <ShadePicker
            shades={getCompatibleShades("cernes")}
            selected={selection.antiCernes}
            onSelect={(id) =>
              setSelection((prev) => ({ ...prev, antiCernes: id }))
            }
            type="cernes"
          />
        </section>
      )}

      {/* Récapitulatif (visible si tout est choisi) */}
      {selection.antiCernes && (
        <div style={{ animation: "fadeInUp 400ms ease-out" }}>
          <SelectionSummary
            carnation={carnations.find((c) => c.id === selection.carnation) ?? null}
            fondDeTeint={getSelectedShade("fond")}
            antiCernes={getSelectedShade("cernes")}
          />
        </div>
      )}
    </div>
  );
}
