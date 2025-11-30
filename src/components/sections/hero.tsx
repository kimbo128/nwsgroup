"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ChevronDown } from "lucide-react"
import { FadeIn } from "@/components/animations/fade-in"
import { CONTACT_PHONE } from "@/lib/constants"
import { motion } from "framer-motion"

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
        <FadeIn delay={0.2}>
          <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight px-2 tracking-tight">
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
            <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base" asChild>
              <Link href="/kontakt?type=verkauf">Auto verkaufen</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20 w-full sm:w-auto h-11 sm:h-12 text-sm sm:text-base" asChild>
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

