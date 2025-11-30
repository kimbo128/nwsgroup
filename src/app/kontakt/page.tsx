"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { LOCATIONS, WHATSAPP_GENERAL, TELEGRAM_BOT_URL } from "@/lib/constants"
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react"

const Map = dynamic(() => import("@/components/map"), { ssr: false })

export default function KontaktPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <FadeIn>
        <h1 className="mb-3 sm:mb-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold">Kontakt</h1>
        <p className="mb-8 sm:mb-10 md:mb-12 text-center text-base sm:text-lg md:text-xl text-muted-foreground px-2">
          Kontaktieren Sie uns - wir helfen Ihnen gerne weiter
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Information */}
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Kontaktinformationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-semibold">E-Mail</h3>
                <a
                  href="mailto:info@nwsgroup.ch"
                  className="flex items-center gap-3 text-primary hover:underline"
                >
                  <Mail className="h-5 w-5 flex-shrink-0" />
                  info@nwsgroup.ch
                </a>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Telefon</h3>
                <div className="space-y-2">
                  {LOCATIONS.map((location) => (
                    <a
                      key={location.name}
                      href={`tel:${location.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{location.name}</div>
                        <div className="text-sm text-muted-foreground">{location.phone}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">WhatsApp</h3>
                <div className="space-y-2">
                  {LOCATIONS.map((location) => (
                    <a
                      key={`whatsapp-${location.name}`}
                      href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 hover:text-primary transition-colors"
                    >
                      <MessageCircle className="h-5 w-5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">WhatsApp {location.name}</div>
                        <div className="text-sm text-muted-foreground">{location.phone}</div>
                      </div>
                    </a>
                  ))}
                  <a
                    href={`https://wa.me/${WHATSAPP_GENERAL.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 flex-shrink-0" />
                    <div>
                      <div className="font-medium">WhatsApp Allgemein</div>
                      <div className="text-sm text-muted-foreground">{WHATSAPP_GENERAL}</div>
                    </div>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold">Telegram</h3>
                <a
                  href={TELEGRAM_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Send className="h-5 w-5 flex-shrink-0" />
                  <span>Telegram Bot öffnen</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Map and Location Details */}
        <FadeIn delay={0.2}>
          <div className="space-y-6">
            {/* Map Preview */}
            {mounted && (
              <Card>
                <CardHeader>
                  <CardTitle>Unsere Standorte</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 sm:h-80 w-full overflow-hidden rounded-lg">
                    <Map />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location Details */}
            {LOCATIONS.map((location) => (
              <Card key={location.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="flex items-start gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    {location.address}
                  </p>
                  <a
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 text-sm hover:text-primary"
                  >
                    <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    {location.phone}
                  </a>
                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-3 text-sm hover:text-primary"
                  >
                    <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    {location.email}
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
