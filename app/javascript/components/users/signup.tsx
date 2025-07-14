import React, { useState, useEffect } from 'react';
import RegistrationForm from '../forms/registration-form';
import { RegistrationData, RegistrationResponse } from '../types/registration-form.types';
import { visit } from '@hotwired/turbo';
import { Navbar } from '../navbar/navbar';

interface SignupPageProps {
  url: string;
  isLoggedIn: boolean;
}

export function SignupPage({ url, isLoggedIn }: SignupPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  // Si el usuario ya está logueado, redirigir
  useEffect(() => {
    if (isLoggedIn) {
      window.location.replace('/dashboard');
    }
  }, [isLoggedIn]);

  const handleRegistration = async (formData: RegistrationData) => {
    setIsLoading(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      // Validación del lado del cliente
      if (formData.password !== formData.passwordConfirmation) {
        setErrors(['Las contraseñas no coinciden']);
        return;
      }

      // Llamada a la API de Rails usando la URL proporcionada
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.passwordConfirmation
          }
        })
      });

      const data: RegistrationResponse = await response.json();

      if (response.ok && data.success) {
        setSuccessMessage('¡Registro exitoso! Redirigiendo...');
        // Redirigir después de un breve delay
        setTimeout(() => {
          visit('/posts', { action: 'replace' });
        }, 2000);
      } else {
        setErrors(data.errors || ['Error en el registro']);
      }
    } catch (error) {
      setErrors(['Error al procesar el registro. Inténtalo de nuevo.']);
      console.error('Error en registro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Mostrar pantalla de carga si el usuario está logueado
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ya has iniciado sesión. Redirigiendo...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {successMessage && (
          <div className="max-w-md mx-auto mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}
        
        <RegistrationForm
          minimumPasswordLength={6}
          onSubmit={handleRegistration}
          errors={errors}
          isLoading={isLoading}
        />
      </div>
    </div>
    </>
  );
};

export default SignupPage; 