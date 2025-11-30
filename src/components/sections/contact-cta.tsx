"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { MessageCircle, Mail, Sparkles, Zap } from "lucide-react"
import { FloatingBadge, PulseGlow } from "@/components/animations/floating-elements"
import { Badge } from "@/components/ui/badge"

export function ContactCTA() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-12 sm:py-16 md:py-20 text-primary-foreground overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <FadeIn>
          <FloatingBadge delay={0.2}>
            <Badge className="mb-4 glass-strong text-white border-white/30 px-4 py-1.5 text-sm font-semibold">
              <Zap className="mr-2 h-3 w-3 inline animate-pulse" />
              Schnelle Antwort garantiert
            </Badge>
          </FloatingBadge>
          <h2 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Haben Sie Fragen?
          </h2>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl px-2 opacity-95">
            Kontaktieren Sie uns - wir helfen Ihnen gerne weiter!
          </p>
          <div className="flex flex-col items-stretch sm:items-center justify-center gap-3 sm:gap-4 sm:flex-row max-w-md sm:max-w-none mx-auto">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base inline-flex items-center justify-center" asChild>
              <a href="mailto:info@nwsgroup.ch" className="inline-flex items-center justify-center">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                E-Mail schreiben
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base inline-flex items-center justify-center"
              asChild
            >
              <Link href="/kontakt" className="inline-flex items-center justify-center">
                <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                WhatsApp Chat
              </Link>
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

