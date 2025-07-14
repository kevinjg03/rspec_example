export interface LoginFormProps {
  onSubmit: (formData: LoginData) => void;
  errors?: string[];
  isLoading?: boolean;
  rememberMe?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  errors?: string[];
  user?: {
    id: number;
    email: string;
  };
} 