import React, { useState, useEffect } from 'react';
import { Navbar } from '../navbar/navbar';
import { visit } from '@hotwired/turbo';
import LoginForm from '../forms/login-form';
import { LoginData, LoginResponse } from '../types/login-form.types';

interface LoginPageProps {
  isLoggedIn: boolean;
}

export function LoginPage({ isLoggedIn }: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (isLoggedIn) {
      visit('/posts', { action: 'replace' });
    }
  }, [isLoggedIn]);

  const handleLogin = async (formData: LoginData) => {
    setIsLoading(true);
    setErrors([]);
    setSuccessMessage('');

    try {
      const response = await fetch('/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          user: {
            email: formData.email,
            password: formData.password,
            remember_me: formData.rememberMe
          },
        }),
      });

      if (response.redirected) {
        visit(response.url, { action: 'replace' });
        return;
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data: LoginResponse = await response.json();
        
        if (response.ok && data.success) {
          setSuccessMessage('¡Inicio de sesión exitoso! Redirigiendo...');
          setTimeout(() => {
            visit('/posts', { action: 'replace' });
          }, 2000);
        } else {
          setErrors(data.errors || ['Error en el inicio de sesión']);
        }
      } else {
        visit(response.url, { action: 'replace' });
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      setErrors(['Error de conexión. Inténtalo de nuevo.']);
    } finally {
      setIsLoading(false);
    }
  };

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
    <div className="overflow-hidden h-screen">
      
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-full max-w-md">
          {successMessage && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              {successMessage}
            </div>
          )}
          
          <LoginForm
            onSubmit={handleLogin}
            errors={errors}
            isLoading={isLoading}
            rememberMe={true}
          />
        </div>
      </div>
    </div>
    </>
  );
}