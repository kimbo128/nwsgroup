"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { MessageCircle, Mail } from "lucide-react"

export function ContactCTA() {
  return (
    <section className="bg-gradient-to-r from-primary to-primary/90 py-12 sm:py-16 md:py-20 text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">
            Haben Sie Fragen?
          </h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl px-2">
            Kontaktieren Sie uns - wir helfen Ihnen gerne weiter!
          </p>
          <div className="flex flex-col items-stretch sm:items-center justify-center gap-3 sm:gap-4 sm:flex-row max-w-md sm:max-w-none mx-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base" asChild>
              <a href="mailto:info@nwsgroup.ch">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                E-Mail schreiben
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base"
              asChild
            >
              <Link href="/kontakt">
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Kontakt
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

