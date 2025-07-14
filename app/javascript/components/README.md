# Componente RegistrationForm

Este componente React TypeScript traduce el formulario de registro de Devise de Rails/ERB a un componente moderno y reutilizable.

## Características

- ✅ Formulario de registro completo con validación
- ✅ Manejo de errores del servidor
- ✅ Estados de carga
- ✅ Diseño responsive con Tailwind CSS
- ✅ TypeScript para type safety
- ✅ Accesibilidad mejorada
- ✅ Auto-completado de navegador

## Uso Básico

```tsx
import RegistrationForm from './RegistrationForm';

const MyComponent = () => {
  const handleRegistration = (formData) => {
    // Manejar el envío del formulario
    console.log(formData);
  };

  return (
    <RegistrationForm
      minimumPasswordLength={6}
      onSubmit={handleRegistration}
      errors={[]}
    />
  );
};
```

## Props

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `minimumPasswordLength` | `number` | No | Longitud mínima de contraseña (default: 6) |
| `onSubmit` | `(formData: RegistrationData) => void` | Sí | Función llamada al enviar el formulario |
| `errors` | `string[]` | No | Array de mensajes de error |
| `isLoading` | `boolean` | No | Estado de carga del formulario |

## Estructura de Datos

```typescript
interface RegistrationData {
  email: string;
  password: string;
  passwordConfirmation: string;
}
```

## Integración con Rails

Para integrar con tu aplicación Rails, asegúrate de:

1. Incluir el token CSRF en el meta tag:
```erb
<meta name="csrf-token" content="<%= form_authenticity_token %>">
```

2. Configurar las rutas de Devise para aceptar JSON:
```ruby
# config/routes.rb
devise_for :users, controllers: {
  registrations: 'users/registrations'
}
```

3. Manejar las respuestas JSON en el controlador:
```ruby
# app/controllers/users/registrations_controller.rb
class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    super do |user|
      if user.persisted?
        render json: { success: true, user: user }
      else
        render json: { success: false, errors: user.errors.full_messages }
      end
    end
  end
end
```

## Estilos

El componente utiliza Tailwind CSS para los estilos. Asegúrate de que Tailwind esté configurado en tu proyecto.

## Accesibilidad

- Labels asociados con inputs
- Mensajes de error claros
- Estados de foco visibles
- Navegación por teclado
- Textos descriptivos para lectores de pantalla 