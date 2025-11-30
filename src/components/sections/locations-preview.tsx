"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LOCATIONS } from "@/lib/constants"
import { FadeIn } from "@/components/animations/fade-in"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function LocationsPreview() {
  return (
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn>
          <h2 className="mb-8 sm:mb-10 md:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
            Unsere Standorte
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
          {LOCATIONS.map((location, index) => (
            <FadeIn key={location.name} delay={index * 0.2}>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
                  <div className="space-y-2 text-xs sm:text-sm">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {location.address}
                    </p>
                    <a
                      href={`tel:${location.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      {location.phone}
                    </a>
                    <a
                      href={`mailto:${location.email}`}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      {location.email}
                    </a>
                    <p className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      {location.hours.weekdays}
                      {location.hours.saturday && (
                        <>
                          <br />
                          {location.hours.saturday}
                        </>
                      )}
                    </p>
                  </div>
                  <Button className="w-full h-9 sm:h-10 text-sm sm:text-base" variant="outline" asChild>
                    <Link href="/standorte">Route planen</Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

