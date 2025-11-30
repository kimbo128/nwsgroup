"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { AUTOSCOUT24_SELLER_URL } from "@/lib/constants"
import { Car, ExternalLink, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FahrzeugePage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
      <FadeIn>
        <div className="text-center mb-12">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Car className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl font-bold">
            Unsere Fahrzeuge
          </h1>
          <p className="mb-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie unsere aktuellen Fahrzeugangebote auf AutoScout24
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Fahrzeuge auf AutoScout24 ansehen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ul className="space-y-3">
              {[
                "Aktuelle Fahrzeugangebote",
                "Detaillierte Fahrzeugbeschreibungen",
                "Hochauflösende Bilder",
                "Transparente Preisgestaltung",
                "Schnelle Kontaktmöglichkeit",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t">
              <Button 
                size="lg" 
                className="w-full group"
                asChild
              >
                <a 
                  href={AUTOSCOUT24_SELLER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  Zu AutoScout24
                  <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <p className="mt-3 text-sm text-center text-muted-foreground">
                Die Seite öffnet sich in einem neuen Tab
              </p>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <FadeIn delay={0.4}>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-4">
            Haben Sie Fragen zu unseren Fahrzeugen?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
            <Button variant="outline" asChild>
              <a href={`tel:+41618219292`}>061 821 92 92</a>
            </Button>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
