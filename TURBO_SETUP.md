# Configuración de Turbo en React on Rails

## Resumen

Esta aplicación ha sido configurada para usar Turbo (la versión moderna de Turbolinks) con React on Rails siguiendo las mejores prácticas de la documentación oficial.

## Cambios Implementados

### 1. Instalación de Dependencias

```bash
npm install @hotwired/turbo
```

### 2. Configuración de JavaScript (`app/javascript/packs/application.js`)

- **Importación de Turbo**: Se importa `Turbo` desde `@hotwired/turbo`
- **Inicialización**: Se llama a `Turbo.start()` para activar Turbo
- **Configuración de React on Rails**: Se configura con `turbo: true` y tracing habilitado en desarrollo

```javascript
import { Turbo } from '@hotwired/turbo';

// Inicializar Turbo
Turbo.start();

// Configurar React on Rails con Turbo
ReactOnRails.setOptions({ 
  turbo: true,
  traceTurbolinks: process.env.TRACE_TURBOLINKS
});
```

### 3. Layout de la Aplicación (`app/views/layouts/application.html.erb`)

- **Data attributes**: Se actualizaron los atributos de `data-turbolinks-track` a `data-turbo-track`
- **JavaScript pack**: Se corrigió la sintaxis del `javascript_pack_tag`

```erb
<%= stylesheet_link_tag 'application', media: 'all', 'data-turbo-track' => 'reload' %>
<%= javascript_pack_tag "application", 'data-turbo-track' => 'reload' %>
```

### 4. Configuración de Webpack (`config/webpack/commonWebpackConfig.js`)

- **DefinePlugin**: Se agregó para habilitar el tracing de Turbo en desarrollo
- **Variable de entorno**: `TRACE_TURBOLINKS` se define automáticamente basado en `NODE_ENV`

```javascript
plugins: [
  new webpack.DefinePlugin({
    'process.env.TRACE_TURBOLINKS': devBuild,
  }),
],
```

## Beneficios de Turbo

1. **Navegación más rápida**: Solo carga el HTML, no recarga JavaScript ni CSS
2. **Mejor experiencia de usuario**: Transiciones más suaves entre páginas
3. **Compatibilidad moderna**: Turbo es la evolución de Turbolinks y es más robusto

## Consideraciones Importantes

### React Router
- **Conflicto potencial**: React Router y Turbo manejan la navegación de manera diferente
- **Recomendación**: Evitar usar React Router o prepararse para manejar conflictos

### Code Splitting
- **Limitación**: Turbo funciona mejor con un solo archivo JS y CSS
- **Alternativa**: Si necesitas code splitting, considera no usar Turbo

### CSRF Tokens
- **Verificación necesaria**: Turbo 5 cambia el elemento head, asegúrate de que los tokens CSRF se manejen correctamente

## Debugging

Para habilitar el tracing de Turbo en desarrollo, los mensajes aparecerán en la consola del navegador con el prefijo **TURBO:**

```javascript
// Los mensajes aparecerán automáticamente en desarrollo
TURBO: WITH TURBO: document turbo:before-render and turbo:render handlers installed.
TURBO: reactOnRailsPageLoaded
```

## Verificación

Para verificar que Turbo está funcionando correctamente:

1. Abre las herramientas de desarrollador del navegador
2. Ve a la pestaña Network
3. Navega entre páginas de tu aplicación
4. Deberías ver que solo se cargan archivos HTML, no se recargan los assets JS/CSS

## Referencias

- [Documentación oficial de React on Rails - Turbo](https://www.shakacode.com/react-on-rails/docs/rails/turbolinks/)
- [Turbo GitHub Repository](https://github.com/hotwired/turbo) 