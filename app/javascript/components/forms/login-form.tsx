import React, { useState } from 'react';

interface LoginFormProps {
  onSubmit: (formData: LoginData) => void;
  errors?: string[];
  isLoading?: boolean;
  rememberMe?: boolean;
}

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  errors = [],
  isLoading = false,
  rememberMe = true
}) => {
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Email Field */}
        <div className="field">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoFocus
            autoComplete="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Password Field */}
        <div className="field">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Remember Me Field */}
        {rememberMe && (
          <div className="field">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                Recordarme
              </label>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="actions">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center space-y-2">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <a href="/users/sign_up" className="text-blue-600 hover:text-blue-800 underline">
            Registrarse
          </a>
        </p>
        <p className="text-sm text-gray-600">
          <a href="/users/password/new" className="text-blue-600 hover:text-blue-800 underline">
            ¿Olvidaste tu contraseña?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm; 