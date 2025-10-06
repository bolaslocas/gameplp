# Pool Live Plus - Versión 1.0

Juego de billar multijugador online con autenticación de Google.

## Características

- Autenticación con Google mediante Firebase
- Juego multijugador en tiempo real
- Soporte multiidioma (Árabe, Inglés, Francés, Español)
- Detección automática de orientación de pantalla
- Sistema de sesiones persistentes (5 días)

## Instalación y Configuración

### Requisitos Previos

- Un proyecto de Firebase (gratuito)
- Navegador web moderno
- Servidor web local o hosting

### Configuración Rápida

1. **Configura Firebase:**
   - Lee el archivo `FIREBASE_SETUP.md` para instrucciones detalladas
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
   - Activa Google Authentication
   - Copia tu configuración de Firebase

2. **Actualiza auth.js:**
   - Abre `auth.js`
   - Reemplaza `firebaseConfig` con tu configuración de Firebase
   - Guarda el archivo

3. **Ejecuta la aplicación:**
   - Abre `app.html` en tu navegador
   - Inicia sesión con Google
   - Disfruta del juego

## Estructura de Archivos

\`\`\`
├── app.html              # Página de inicio de sesión
├── game.html             # Página principal del juego
├── game.js               # Lógica del juego
├── auth.js               # Utilidades de autenticación
├── google.html           # Autenticación legacy (no usar)
├── preload.js            # Precarga de recursos
├── lib/
│   ├── firebasejs_7.22.0.js  # SDK de Firebase
│   ├── socket.io.js          # WebSocket para multijugador
│   └── getCountry.js         # Detección de país
├── assets/               # Recursos del juego
├── FIREBASE_SETUP.md     # Guía de configuración
└── README.md             # Este archivo
\`\`\`

## Flujo de Autenticación

1. Usuario accede a `app.html`
2. Hace clic en "Iniciar sesión con Google"
3. Popup de Google para seleccionar cuenta
4. Firebase valida la autenticación
5. Se guarda la sesión en localStorage (5 días)
6. Redirección automática a `game.html`
7. El juego verifica la sesión antes de cargar

## Desarrollo Local

Para probar localmente:

\`\`\`bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx http-server -p 8000

# Opción 3: PHP
php -S localhost:8000
\`\`\`

Luego abre: `http://localhost:8000/app.html`

## Despliegue

### Vercel / Netlify / GitHub Pages

1. Sube todos los archivos a tu repositorio
2. Configura el dominio en Firebase Console (Authorized domains)
3. Despliega normalmente

### Firebase Hosting

\`\`\`bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
\`\`\`

## Solución de Problemas

### "Unauthorized domain"
Agrega tu dominio en Firebase Console → Authentication → Settings → Authorized domains

### "Configuration not found"
Verifica que hayas actualizado `auth.js` con tu configuración de Firebase

### El juego no carga
Abre la consola del navegador (F12) y busca errores en rojo

### Sesión no persiste
Verifica que localStorage esté habilitado en tu navegador

## Seguridad

- Las credenciales de Firebase son públicas por diseño
- La seguridad se maneja en el backend de Firebase
- Configura reglas de seguridad en Firebase Console
- Nunca expongas claves privadas o secretos

## Idiomas Soportados

- Árabe (ar)
- Inglés (en)
- Francés (fr)
- Español (es)

El idioma se detecta automáticamente según la configuración del navegador.

## Tecnologías

- Firebase Authentication 7.22.0
- Socket.io para multijugador
- Vanilla JavaScript
- HTML5 Canvas
- CSS3

## Licencia

Todos los derechos reservados.

## Soporte

Para problemas o preguntas:
1. Revisa `FIREBASE_SETUP.md`
2. Consulta la consola del navegador
3. Verifica la documentación de Firebase

---

**Versión:** 1.0  
**Última actualización:** 2025
