"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import {
  Phone,
  FileText,
  Truck,
  CheckCircle,
  Wrench,
  Users,
  Car,
  ShoppingCart,
} from "lucide-react"

export default function DienstleistungenPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <FadeIn>
        <h1 className="mb-3 sm:mb-4 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
          Unsere Dienstleistungen
        </h1>
        <p className="mb-8 sm:mb-10 md:mb-12 text-center text-base sm:text-lg md:text-xl text-muted-foreground px-2">
          Professionelle Lösungen für alle Ihre Fahrzeugbedürfnisse
        </p>
      </FadeIn>

      {/* Autoankauf */}
      <section id="ankauf" className="mb-20 scroll-mt-20">
        <FadeIn>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Car className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Autoankauf</h2>
              <p className="text-muted-foreground">
                Wir kaufen Autos aller Marken und Modelle zu fairen Preisen
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              step: 1,
              title: "Kontakt aufnehmen",
              description:
                "Rufen Sie uns an oder füllen Sie unser Kontaktformular aus. Wir vereinbaren einen Termin für die Besichtigung.",
              icon: Phone,
            },
            {
              step: 2,
              title: "Bewertung & Angebot",
              description:
                "Unsere Experten bewerten Ihr Fahrzeug professionell und erstellen Ihnen ein faires, unverbindliches Angebot.",
              icon: FileText,
            },
            {
              step: 3,
              title: "Abholung & Zahlung",
              description:
                "Nach Vertragsabschluss holen wir Ihr Fahrzeug ab und überweisen den Kaufpreis sofort auf Ihr Konto.",
              icon: Truck,
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <FadeIn key={item.step} delay={index * 0.1}>
                <Card>
                  <CardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {item.step}
                      </span>
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </FadeIn>
            )
          })}
        </div>

        <FadeIn delay={0.4}>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <Link href="/kontakt?type=verkauf">Jetzt Auto verkaufen</Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Gebrauchtwagenverkauf */}
      <section id="verkauf" className="mb-20 scroll-mt-20">
        <FadeIn>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <ShoppingCart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Gebrauchtwagenverkauf</h2>
              <p className="text-muted-foreground">
                Geprüfte Fahrzeuge in bester Qualität zu attraktiven Preisen
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Unser Qualitätsversprechen</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {[
                  "Umfassende technische Prüfung aller Fahrzeuge",
                  "Transparente Preisgestaltung ohne versteckte Kosten",
                  "Ausführliche Fahrzeugbeschreibung mit Fotos",
                  "Gewährleistung und Garantie nach gesetzlichen Bestimmungen",
                  "Professionelle Beratung vor dem Kauf",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-5 w-5 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/fahrzeuge">Fahrzeuge ansehen</Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Karosseriearbeiten */}
      <section id="karosserie" className="mb-20 scroll-mt-20">
        <FadeIn>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Wrench className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Karosseriearbeiten</h2>
              <p className="text-muted-foreground">
                Professionelle Reparaturen und Lackierarbeiten für Ihr Fahrzeug
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              "Unfallreparaturen",
              "Lackierarbeiten",
              "Dellenentfernung",
              "Rostbehandlung",
              "Karosserieverkleidung",
              "Glasreparaturen",
            ].map((service, index) => (
              <FadeIn key={service} delay={index * 0.05}>
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <CheckCircle className="h-6 w-6 text-primary" />
                    <span className="text-lg font-medium">{service}</span>
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <Link href="/kontakt?type=service">Termin vereinbaren</Link>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* Persönliche Beratung */}
      <section id="beratung" className="mb-20 scroll-mt-20">
        <FadeIn>
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Persönliche Beratung</h2>
              <p className="text-muted-foreground">
                Individuelle Beratung für Ihre individuellen Bedürfnisse
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <Card>
            <CardContent className="p-8">
              <p className="mb-4 text-lg">
                Unser erfahrenes Team steht Ihnen mit Rat und Tat zur Seite.
                Egal ob Sie ein Fahrzeug kaufen, verkaufen oder reparieren
                möchten - wir finden die beste Lösung für Sie.
              </p>
              <p className="text-muted-foreground">
                Besuchen Sie uns an einem unserer beiden Standorte in Pratteln
                oder Dornach. Wir freuen uns auf Sie!
              </p>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-8 text-center">
            <Button size="lg" asChild>
              <Link href="/kontakt">Kontakt aufnehmen</Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </div>
  )
}

