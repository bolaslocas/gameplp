// Firebase Configuration for Pool Live Plus
import { initializeApp, getApps, getApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth"
import { getAnalytics, isSupported } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyBVLFM3mX6bs8N_CCeDNZCuEPe0VD5f9jk",
  authDomain: "pltweb.firebaseapp.com",
  projectId: "pltweb",
  storageBucket: "pltweb.firebasestorage.app",
  messagingSenderId: "516636654275",
  appId: "1:516636654275:web:c09ff9f2bfa186ef8b4076",
  measurementId: "G-BR0H7T19H9",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)

// Initialize Analytics only on client side
if (typeof window !== "undefined") {
  isSupported().then((yes) => yes && getAnalytics(app))
}

// Session configuration
const SESSION_KEY = "pool_live_session"
const SESSION_EXPIRES_KEY = "session_expires_at"
const SESSION_DURATION = 5 * 24 * 60 * 60 * 1000 // 5 days

// Session management
export function saveSession(user: User) {
  if (typeof window === "undefined") return

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

export function getSession() {
  if (typeof window === "undefined") return null

  try {
    const sessionData = localStorage.getItem(SESSION_KEY)
    const expiresAt = Number.parseInt(localStorage.getItem(SESSION_EXPIRES_KEY) || "0", 10)

    if (!sessionData || !expiresAt) {
      return null
    }

    if (Date.now() > expiresAt) {
      console.log("[v0] Session expired")
      clearSession()
      return null
    }

    return JSON.parse(sessionData)
  } catch (error) {
    console.error("[v0] Error reading session:", error)
    clearSession()
    return null
  }
}

export function clearSession() {
  if (typeof window === "undefined") return

  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(SESSION_EXPIRES_KEY)
  console.log("[v0] Session cleared")
}

export function isAuthenticated() {
  return getSession() !== null
}

export async function signInWithGoogle() {
  try {
    console.log("[v0] Starting Google sign in")
    const provider = new GoogleAuthProvider()

    // Add required scopes
    provider.addScope("profile")
    provider.addScope("email")

    // Set custom parameters
    provider.setCustomParameters({
      prompt: "select_account",
    })

    const result = await signInWithPopup(auth, provider)

    console.log("[v0] Sign in successful:", result.user.email)
    saveSession(result.user)

    return result.user
  } catch (error: any) {
    console.error("[v0] Sign in error:", error.code, error.message)

    // Handle specific errors
    if (error.code === "auth/popup-closed-by-user") {
      throw new Error("Login cancelado por el usuario")
    } else if (error.code === "auth/popup-blocked") {
      throw new Error("Popup bloqueado. Por favor permite popups para este sitio.")
    } else if (error.code === "auth/unauthorized-domain") {
      throw new Error("Dominio no autorizado. Configura el dominio en Firebase Console.")
    }

    throw error
  }
}

export async function signOut() {
  try {
    await firebaseSignOut(auth)
    clearSession()
    console.log("[v0] Sign out successful")
    return true
  } catch (error) {
    console.error("[v0] Sign out error:", error)
    throw error
  }
}

export function getCurrentUser() {
  return getSession()
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("[v0] Firebase user detected:", user.email)
      saveSession(user)
      callback(user)
    } else {
      console.log("[v0] No Firebase user detected")
      callback(null)
    }
  })
}

export { auth, app }
