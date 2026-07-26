/**
 * Module Orders — Interface publique
 * Règle modulaire : seuls ces exports sont consommables par les autres modules.
 */

export { submitOrder } from "./actions";
export type { OrderFormState } from "./types";
export { initialOrderFormState } from "./types";
export { OrderForm } from "./components/OrderForm";
export { OrderSummaryBar } from "./components/OrderSummaryBar";
