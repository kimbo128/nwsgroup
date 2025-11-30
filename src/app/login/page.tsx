"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { FadeIn } from "@/components/animations/fade-in"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Ungültige Anmeldedaten")
      } else {
        // Prüfe ob User Admin ist
        const checkAdmin = await fetch("/api/admin/check")
        const adminData = await checkAdmin.json()
        
        if (adminData.isAdmin) {
          router.push("/dashboard")
        } else {
          router.push("/coming-soon")
        }
        router.refresh()
      }
    } catch (error) {
      setError("Ein Fehler ist aufgetreten")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <FadeIn>
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <Image
                src="/logo.png"
                alt="NWS Group AG"
                width={64}
                height={64}
                className="h-16 w-16 object-contain"
              />
            </div>
            <CardTitle className="text-2xl">Anmelden</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ihre.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Passwort</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, remember: checked === true })
                  }
                />
                <Label
                  htmlFor="remember"
                  className="cursor-pointer text-sm font-normal"
                >
                  Angemeldet bleiben
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Wird angemeldet..." : "Anmelden"}
              </Button>

              <div className="text-center text-sm">
                <Link
                  href="/register"
                  className="text-primary hover:underline"
                >
                  Noch kein Konto? Registrieren
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}

