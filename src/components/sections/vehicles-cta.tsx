"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { AUTOSCOUT24_SELLER_URL } from "@/lib/constants"
import { Car, ExternalLink, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function VehiclesCTA() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="text-center mb-8 sm:mb-10">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Car className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl font-display">
              Unsere Fahrzeuge
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie unsere aktuellen Fahrzeugangebote auf AutoScout24
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card className="mb-6 max-w-2xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <ul className="space-y-3 mb-6">
                {[
                  "Aktuelle Fahrzeugangebote",
                  "Detaillierte Fahrzeugbeschreibungen",
                  "Hochauflösende Bilder",
                  "Transparente Preisgestaltung",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>

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
                  Fahrzeuge auf AutoScout24 ansehen
                  <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </section>
  )
}



