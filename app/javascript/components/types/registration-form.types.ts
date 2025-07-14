export interface RegistrationFormProps {
  minimumPasswordLength?: number;
  onSubmit: (formData: RegistrationData) => void;
  errors?: string[];
  isLoading?: boolean;
  redirectUrl?: string;
}

export interface RegistrationData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface RegistrationResponse {
  success: boolean;
  message?: string;
  errors?: string[];
  user?: {
    id: number;
    email: string;
  };
} 