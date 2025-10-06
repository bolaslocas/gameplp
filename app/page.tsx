"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signInWithGoogle, isAuthenticated } from "@/lib/firebase"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showWelcome, setShowWelcome] = useState(true)
  const [loadingText, setLoadingText] = useState("جارٍ التحميل.")

  useEffect(() => {
    if (isAuthenticated()) {
      console.log("[v0] User already authenticated, redirecting to game")
      router.push("/game")
    }
  }, [router])

  useEffect(() => {
    const loadingTexts = ["جارٍ التحميل.", "جارٍ التحميل..", "جارٍ التحميل..."]
    let index = 0

    const interval = setInterval(() => {
      index = (index + 1) % loadingTexts.length
      setLoadingText(loadingTexts[index])
    }, 700)

    const timer = setTimeout(() => {
      setShowWelcome(false)
      clearInterval(interval)
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const handleGoogleSignIn = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Attempting Google sign in")
      await signInWithGoogle()
      console.log("[v0] Sign in successful, redirecting to game")
      router.push("/game")
    } catch (err: any) {
      console.error("[v0] Sign in failed:", err)
      setError(err.message || "Error al iniciar sesión. Por favor intenta de nuevo.")
      setLoading(false)
    }
  }

  if (showWelcome) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 animate-in fade-in duration-500">
        <h1 className="text-5xl font-bold text-white mb-4">Pool Live Plus</h1>
        <p className="text-xl text-white">{loadingText}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/bggg.jpg)" }} />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Login Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-black/75 rounded-xl p-8 md:p-12 max-w-md w-full shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">مرحباً بك في Pool Live Plus</h2>

          <p className="text-white/90 text-center mb-8 leading-relaxed">
            يجب عليك تسجيل الدخول عبر حساب جوجل لتتمكن من اللعب والاستمتاع بالمزايا.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <Button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-gray-700 font-medium py-6 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            {loading ? (
              <span>جارٍ تسجيل الدخول...</span>
            ) : (
              <>
                <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                  <g fill="none" fillRule="evenodd">
                    <path
                      d="M17.6 9.2l-.1-1.8H9v3.4h4.8C13.6 12 13 13 12 13.6v2.2h3a8.8 8.8 0 0 0 2.6-6.6z"
                      fill="#4285F4"
                      fillRule="nonzero"
                    />
                    <path
                      d="M9 18c2.4 0 4.5-.8 6-2.2l-3-2.2a5.4 5.4 0 0 1-8-2.9H1V13a9 9 0 0 0 8 5z"
                      fill="#34A853"
                      fillRule="nonzero"
                    />
                    <path d="M4 10.7A5.4 5.4 0 0 1 4 7.3V5H1a9 9 0 0 0 0 8l3-2.3z" fill="#FBBC05" fillRule="nonzero" />
                    <path
                      d="M9 3.6c1.3 0 2.5.4 3.4 1.3L15 2.3A9 9 0 0 0 1 5l3 2.4a5.4 5.4 0 0 1 5-3.7z"
                      fill="#EA4335"
                      fillRule="nonzero"
                    />
                  </g>
                </svg>
                <span>تسجيل الدخول عبر جوجل</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
