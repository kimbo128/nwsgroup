"use client"

import { useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LOCATIONS } from "@/lib/constants"
import { FadeIn } from "@/components/animations/fade-in"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import("@/components/map"), { ssr: false })

export default function StandortePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <FadeIn>
        <h1 className="mb-3 sm:mb-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold">Unsere Standorte</h1>
        <p className="mb-8 sm:mb-10 md:mb-12 text-center text-base sm:text-lg md:text-xl text-muted-foreground px-2">
          Besuchen Sie uns an einem unserer beiden Standorte
        </p>
      </FadeIn>

      {/* Map */}
      <div className="mb-8 sm:mb-10 md:mb-12 h-[300px] sm:h-[400px] md:h-[500px] w-full overflow-hidden rounded-lg">
        <Map />
      </div>

      {/* Location Cards */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 md:grid-cols-2">
        {LOCATIONS.map((location, index) => (
          <FadeIn key={location.name} delay={index * 0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  {location.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{location.address}</p>
                    </div>
                  </div>

                  <a
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <span>{location.phone}</span>
                  </a>

                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-3 hover:text-primary transition-colors"
                  >
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <span>{location.email}</span>
                  </a>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-1 h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Öffnungszeiten</p>
                      <p className="text-sm text-muted-foreground">
                        {location.hours.weekdays}
                        {location.hours.saturday && (
                          <>
                            <br />
                            {location.hours.saturday}
                          </>
                        )}
                        {location.hours.sunday && (
                          <>
                            <br />
                            {location.hours.sunday}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Route planen
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  )
}

