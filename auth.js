// Firebase Authentication Utilities for Pool Live Plus

// CONFIGURACIÓN DE FIREBASE - REEMPLAZA CON TUS CREDENCIALES
const firebaseConfig = {
  apiKey: "AIzaSyBVLFM3mX6bs8N_CCeDNZCuEPe0VD5f9jk",
  authDomain: "pltweb.firebaseapp.com",
  projectId: "pltweb",
  storageBucket: "pltweb.firebasestorage.app",
  messagingSenderId: "516636654275",
  appId: "1:516636654275:web:c09ff9f2bfa186ef8b4076",
  measurementId: "G-BR0H7T19H9"
}

// Inicializar Firebase
let app, auth
try {
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app()
  }
  auth = firebase.auth()
  console.log("[v0] Firebase initialized successfully")
} catch (error) {
  console.error("[v0] Firebase initialization error:", error)
  console.error("[v0] Make sure to replace firebaseConfig with your own credentials")
}

// Configuración de sesión
const SESSION_KEY = "pool_live_session"
const SESSION_EXPIRES_KEY = "session_expires_at"
const SESSION_DURATION = 5 * 24 * 60 * 60 * 1000

// Guardar sesión en localStorage
function saveSession(user) {
  const sessionData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    timestamp: Date.now(),
  }

  const expiresAt = Date.now() + SESSION_DURATION

  localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData))
  localStorage.setItem(SESSION_EXPIRES_KEY, expiresAt.toString())

  console.log("[v0] Session saved:", sessionData.email)
}

// Obtener sesión de localStorage
function getSession() {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY)
    const expiresAt = Number.parseInt(localStorage.getItem(SESSION_EXPIRES_KEY), 10)

    if (!sessionData || !expiresAt) {
      console.log("[v0] No session found")
      return null
    }

    if (Date.now() > expiresAt) {
      console.log("[v0] Session expired")
      clearSession()
      return null
    }

    console.log("[v0] Valid session found")
    return JSON.parse(sessionData)
  } catch (error) {
    console.error("[v0] Error reading session:", error)
    clearSession()
    return null
  }
}

// Limpiar sesión de localStorage
function clearSession() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(SESSION_EXPIRES_KEY)
  console.log("[v0] Session cleared")
}

// Verificar si el usuario está autenticado
function isAuthenticated() {
  const session = getSession()
  return session !== null
}

// Iniciar sesión con Google
async function signInWithGoogle() {
  try {
    console.log("[v0] Starting Google sign in")
    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope("profile")
    provider.addScope("email")

    const result = await auth.signInWithPopup(provider)

    console.log("[v0] Sign in successful:", result.user.email)
    saveSession(result.user)

    return result.user
  } catch (error) {
    console.error("[v0] Sign in error:", error.code, error.message)
    throw error
  }
}

// Cerrar sesión
async function signOut() {
  try {
    await auth.signOut()
    clearSession()
    console.log("[v0] Sign out successful")
    return true
  } catch (error) {
    console.error("[v0] Sign out error:", error)
    throw error
  }
}

// Obtener datos del usuario actual
function getCurrentUser() {
  return getSession()
}

// Verificar estado de autenticación de Firebase
function checkFirebaseAuth() {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      if (user) {
        console.log("[v0] Firebase user detected:", user.email)
        saveSession(user)
        resolve(user)
      } else {
        console.log("[v0] No Firebase user detected")
        resolve(null)
      }
    })
  })
}

// Exportar funciones para uso en otros archivos
window.PoolAuth = {
  signInWithGoogle,
  signOut,
  isAuthenticated,
  getCurrentUser,
  saveSession,
  clearSession,
  checkFirebaseAuth,
  getAuth: () => auth,
  getFirebase: () => firebase,
}

console.log("[v0] PoolAuth initialized and ready")
