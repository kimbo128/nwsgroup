"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { Clock, Mail, Phone } from "lucide-react"
import { CONTACT_PHONE } from "@/lib/constants"

export default function ComingSoonPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Wenn User Admin ist, weiterleiten zum Dashboard
    if (session?.user) {
      // Prüfe ob User Admin ist (muss aus DB geladen werden)
      fetch("/api/admin/check")
        .then((res) => res.json())
        .then((data) => {
          if (data.isAdmin) {
            router.push("/dashboard")
          }
        })
        .catch(() => {
          // Fehler ignorieren, Coming Soon Seite anzeigen
        })
    }
  }, [session, router])

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <FadeIn>
        <Card className="w-full max-w-2xl">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="mb-6 flex justify-center">
              <Image
                src="/logo.png"
                alt="NWS Group AG"
                width={120}
                height={120}
                className="h-24 w-24 sm:h-32 sm:w-32 object-contain"
              />
            </div>

            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-primary/10 p-4">
                <Clock className="h-12 w-12 text-primary" />
              </div>
            </div>

            <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold">
              Coming Soon
            </h1>

            <p className="mb-8 text-lg text-muted-foreground">
              Vielen Dank für Ihre Registrierung! Wir arbeiten gerade an der finalen Version
              unserer Plattform. Sie werden benachrichtigt, sobald alles bereit ist.
            </p>

            <div className="mb-8 rounded-lg bg-muted/50 p-6 text-left">
              <h2 className="mb-4 text-xl font-semibold">
                Was Sie erwarten können:
              </h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Vollständiger Zugang zu allen Funktionen</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Persönliches Dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Fahrzeug-Favoriten und Anfragen</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Exklusive Angebote und Updates</span>
                </li>
              </ul>
            </div>

            <div className="mb-8 space-y-4">
              <p className="font-semibold">Haben Sie Fragen?</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Phone className="h-5 w-5" />
                  {CONTACT_PHONE}
                </a>
                <a
                  href="mailto:info@nwsgroup.ch"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <Mail className="h-5 w-5" />
                  info@nwsgroup.ch
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/">Zur Startseite</Link>
              </Button>
              {session && (
                <Button asChild variant="outline">
                  <Link href="/api/auth/signout">Abmelden</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}



