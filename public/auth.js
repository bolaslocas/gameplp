// Firebase Authentication Utilities for Pool Live Plus

// Wait for Firebase to be loaded
if (typeof window.firebase === "undefined") {
  console.error("[v0] Firebase SDK not loaded! Check script tags in HTML.")
  throw new Error("Firebase SDK not loaded")
}

console.log("[v0] Firebase SDK loaded successfully")

// Import Firebase
const firebase = window.firebase

// CONFIGURACIÓN DE FIREBASE - REEMPLAZA CON TUS CREDENCIALES
const firebaseConfig = {
  apiKey: "AIzaSyBVLFM3mX6bs8N_CCeDNZCuEPe0VD5f9jk",
  authDomain: "pltweb.firebaseapp.com",
  projectId: "pltweb",
  storageBucket: "pltweb.firebasestorage.app",
  messagingSenderId: "516636654275",
  appId: "1:516636654275:web:c09ff9f2bfa186ef8b4076",
  measurementId: "G-BR0H7T19H9",
}

console.log("[v0] Initializing Firebase authentication...")

// Inicializar Firebase
let app, auth
try {
  if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
    console.log("[v0] Firebase initialized successfully")
  } else {
    app = firebase.app()
    console.log("[v0] Using existing Firebase app")
  }
  auth = firebase.auth()
  console.log("[v0] Firebase Auth initialized successfully")
} catch (error) {
  console.error("[v0] Firebase initialization error:", error)
  throw error
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
}

// Obtener sesión de localStorage
function getSession() {
  try {
    const sessionData = localStorage.getItem(SESSION_KEY)
    const expiresAt = Number.parseInt(localStorage.getItem(SESSION_EXPIRES_KEY), 10)

    if (!sessionData || !expiresAt) {
      return null
    }

    if (Date.now() > expiresAt) {
      clearSession()
      return null
    }

    return JSON.parse(sessionData)
  } catch (error) {
    console.error("Error reading session:", error)
    clearSession()
    return null
  }
}

// Limpiar sesión de localStorage
function clearSession() {
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(SESSION_EXPIRES_KEY)
}

// Verificar si el usuario está autenticado
function isAuthenticated() {
  const session = getSession()
  return session !== null
}

// Iniciar sesión con Google
async function signInWithGoogle() {
  try {
    console.log("[v0] Starting Google sign-in...")

    if (!auth) {
      throw new Error("Firebase Auth not initialized")
    }

    const provider = new firebase.auth.GoogleAuthProvider()

    provider.addScope("profile")
    provider.addScope("email")

    const result = await auth.signInWithPopup(provider)

    console.log("[v0] Sign-in successful:", result.user.email)

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
    return true
  } catch (error) {
    console.error("Sign out error:", error)
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
        saveSession(user)
        resolve(user)
      } else {
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
