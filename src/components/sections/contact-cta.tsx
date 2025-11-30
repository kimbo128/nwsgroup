"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { MessageCircle } from "lucide-react"

export function ContactCTA() {
  return (
    <section className="bg-primary py-20 text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Haben Sie Fragen?
          </h2>
          <p className="mb-8 text-xl">
            Kontaktieren Sie uns - wir helfen Ihnen gerne weiter!
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/kontakt">Kontaktformular</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/kontakt">
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Chat
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

