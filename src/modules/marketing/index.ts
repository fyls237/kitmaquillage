/**
 * Module Marketing — Interface publique
 * Règle modulaire : seuls ces exports sont consommables par les autres modules.
 */

export { subscribeToWaitlist } from "./actions";
export type { WaitlistFormState } from "./types";
export { initialFormState } from "./types";
