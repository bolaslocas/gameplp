# Configuración de Firebase para Pool Live Plus

Para que el sistema de autenticación funcione, necesitas configurar tu propio proyecto de Firebase.

## Pasos para configurar Firebase:

### 1. Crear un proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en "Agregar proyecto" o "Add project"
3. Ingresa un nombre para tu proyecto (ej: "pool-live-plus")
4. Sigue los pasos del asistente de configuración

### 2. Activar Google Authentication

1. En el menú lateral, ve a **Authentication** (Autenticación)
2. Haz clic en la pestaña **Sign-in method** (Método de inicio de sesión)
3. Busca **Google** en la lista de proveedores
4. Haz clic en **Google** y actívalo
5. Ingresa un correo electrónico de soporte del proyecto
6. Guarda los cambios

### 3. Obtener la configuración de Firebase

1. En el menú lateral, haz clic en el ícono de engranaje ⚙️ y selecciona **Project settings** (Configuración del proyecto)
2. Desplázate hacia abajo hasta la sección **Your apps** (Tus aplicaciones)
3. Haz clic en el ícono **</>** (Web)
4. Registra tu aplicación con un nombre (ej: "Pool Live Plus Web")
5. Copia la configuración que aparece (el objeto `firebaseConfig`)

### 4. Reemplazar la configuración en auth.js

1. Abre el archivo `auth.js`
2. Busca la sección `firebaseConfig` al inicio del archivo
3. Reemplaza los valores de ejemplo con tu configuración real:

\`\`\`javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
  measurementId: "G-XXXXXXXXXX"
};
\`\`\`

### 5. Configurar dominios autorizados

1. En Firebase Console, ve a **Authentication** > **Settings** (Configuración)
2. En la pestaña **Authorized domains** (Dominios autorizados)
3. Agrega los dominios donde alojarás tu aplicación:
   - `localhost` (para desarrollo local)
   - Tu dominio de producción (ej: `tudominio.com`)

### 6. Probar la autenticación

1. Abre `app.html` en tu navegador
2. Haz clic en "Iniciar sesión con Google"
3. Selecciona tu cuenta de Google
4. Deberías ser redirigido a `game.html` después de iniciar sesión

## Notas importantes:

- **Seguridad**: La configuración de Firebase (apiKey, etc.) puede ser pública en el código del cliente. Firebase usa reglas de seguridad del lado del servidor para proteger tus datos.
- **Reglas de seguridad**: Configura reglas de seguridad apropiadas en Firebase para proteger tu base de datos y almacenamiento.
- **Producción**: Antes de lanzar en producción, revisa y configura las reglas de seguridad de Firebase adecuadamente.

## Flujo de autenticación:

1. Usuario visita `app.html`
2. Hace clic en "Iniciar sesión con Google"
3. Se abre popup de Google para autenticación
4. Después de autenticarse, se guarda la sesión en localStorage
5. Usuario es redirigido a `game.html`
6. `game.html` verifica la autenticación al cargar
7. Si no está autenticado, redirige de vuelta a `app.html`

## Soporte:

Si tienes problemas con la configuración:
1. Verifica que Google Authentication esté activado en Firebase
2. Revisa la consola del navegador para ver errores
3. Asegúrate de que tu dominio esté en la lista de dominios autorizados
4. Verifica que la configuración en `auth.js` sea correcta
