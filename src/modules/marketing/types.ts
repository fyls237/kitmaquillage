export interface WaitlistFormState {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
  };
}

export const initialFormState: WaitlistFormState = {
  success: false,
  message: "",
};
