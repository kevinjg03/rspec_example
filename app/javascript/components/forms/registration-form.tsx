import React, { useState } from 'react';
import { Navbar } from '../navbar/navbar';

interface RegistrationFormProps {
  minimumPasswordLength?: number;
  onSubmit: (formData: RegistrationData) => void;
  errors?: string[];
  isLoading?: boolean;
  isLoggedIn?: boolean;
}

interface RegistrationData {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  minimumPasswordLength = 6,
  onSubmit,
  errors = [],
  isLoading = false,
  isLoggedIn = false
}) => {
  const [formData, setFormData] = useState<RegistrationData>({
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>

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
          {minimumPasswordLength && (
            <em className="text-sm text-gray-500">
              ({minimumPasswordLength} caracteres mínimo)
            </em>
          )}
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="new-password"
            minLength={minimumPasswordLength}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mt-1"
            required
          />
        </div>

        {/* Password Confirmation Field */}
        <div className="field">
          <label htmlFor="passwordConfirmation" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleInputChange}
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="actions">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Registrando...' : 'Registrarse'}
          </button>
        </div>
      </form>

      {/* Shared Links */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{' '}
          <a href="/users/sign_in" className="text-blue-600 hover:text-blue-800 underline">
            Iniciar sesión
          </a>
        </p>
      </div>
    </div>
    </>
  );
};

export default RegistrationForm; 