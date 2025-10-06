"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, getCurrentUser } from "@/lib/firebase"

export default function GamePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [gameLoaded, setGameLoaded] = useState(false)

  useEffect(() => {
    console.log("[v0] Game page loaded - Checking authentication")

    if (!isAuthenticated()) {
      console.log("[v0] User not authenticated, redirecting to login")
      router.push("/")
      return
    }

    const user = getCurrentUser()
    console.log("[v0] User authenticated:", user?.email)

    setLoading(false)

    loadGameScript()
  }, [router])

  const loadGameScript = () => {
    console.log("[v0] Loading game script")

    // Create script element
    const script = document.createElement("script")
    script.src = "/game.js"
    script.async = true
    script.onload = () => {
      console.log("[v0] Game script loaded successfully")
      setGameLoaded(true)
    }
    script.onerror = () => {
      console.error("[v0] Failed to load game script")
    }

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-2xl">جارٍ التحميل...</div>
      </div>
    )
  }

  return (
    <div
      id="swagWrapper"
      className="fixed inset-0 w-full h-full"
      style={{
        backgroundImage: "url(/BG_Game.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Game will be rendered here by game.js */}
    </div>
  )
}
