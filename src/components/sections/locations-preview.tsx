"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LOCATIONS } from "@/lib/constants"
import { FadeIn } from "@/components/animations/fade-in"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function LocationsPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Unsere Standorte
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {LOCATIONS.map((location, index) => (
            <FadeIn key={location.name} delay={index * 0.2}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
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
                  <Button className="w-full" variant="outline" asChild>
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

