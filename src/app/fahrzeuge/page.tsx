"use client"

import { useEffect, useState } from "react"
import { AUTOSCOUT24_SELLER_URL } from "@/lib/constants"

export default function FahrzeugePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Fahrzeuge werden geladen...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
      <iframe
        src={AUTOSCOUT24_SELLER_URL}
        className="absolute inset-0 h-full w-full border-0"
        title="AutoScout24 Fahrzeuge"
        allow="fullscreen"
        loading="lazy"
      />
    </div>
  )
}
