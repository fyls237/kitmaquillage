export interface OrderFormState {
  success: boolean;
  message: string;
  orderNumber?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    phone?: string[];
    city?: string[];
    cgv?: string[];
  };
}

export const initialOrderFormState: OrderFormState = {
  success: false,
  message: "",
};
