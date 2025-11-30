"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ChevronDown, Sparkles } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { FloatingBadge, PulseGlow } from "@/components/animations/floating-elements"
import { CONTACT_PHONE } from "@/lib/constants"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center py-20 sm:py-24">
      {/* Boxed Image Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="relative rounded-2xl sm:rounded-3xl border border-white/30 bg-background/10 backdrop-blur-xl shadow-2xl overflow-hidden aspect-[16/9] min-h-[500px] sm:min-h-[600px] ring-1 ring-white/20">
          {/* Background Image */}
          <Image
            src="/header.png"
            alt="NWS Group AG"
            fill
            className="object-cover scale-105 transition-transform duration-700 hover:scale-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/70" />
          
          {/* Content */}
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-6 sm:p-8 md:p-12 lg:p-16">
            {/* Floating Eye-Catcher Badge */}
            <FloatingBadge delay={0.1}>
              <Badge className="mb-4 glass-strong text-white border-white/30 px-4 py-1.5 text-sm font-semibold">
                <Sparkles className="mr-2 h-3 w-3 inline animate-pulse" />
                Zwei Standorte • Pratteln & Dornach
              </Badge>
            </FloatingBadge>

        <FadeIn delay={0.2}>
          <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-tight px-2 tracking-tight">
            Ihr Partner für Autoankauf,
            <br />
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">-verkauf & Karosseriearbeiten</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mb-6 sm:mb-8 text-base sm:text-lg md:text-xl lg:text-2xl px-2">
            An zwei Standorten in Pratteln und Dornach für Sie da
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="mb-6 sm:mb-8 flex flex-col items-stretch sm:items-center gap-3 sm:gap-4 w-full max-w-md sm:flex-row sm:max-w-none px-2">
            <PulseGlow>
              <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base relative overflow-hidden group" asChild>
                <Link href="/kontakt?type=verkauf">
                  <span className="relative z-10">Auto verkaufen</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Link>
              </Button>
            </PulseGlow>
            <Button size="lg" variant="outline" className="glass border-white/30 text-white hover:bg-white/20 hover:border-white/50 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base transition-all duration-300" asChild>
              <Link href="/fahrzeuge">Fahrzeuge ansehen</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-base sm:text-lg md:text-xl font-semibold hover:text-primary transition-colors px-2"
          >
            <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
            {CONTACT_PHONE}
          </a>
        </FadeIn>

            {/* Scroll Down Animation */}
            <motion.div
              className="mt-8 sm:mt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="h-8 w-8 text-white" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

