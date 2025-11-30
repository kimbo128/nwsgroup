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
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/header.png"
          alt="NWS Group AG"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <FadeIn delay={0.2}>
          <h1 className="mb-4 text-4xl font-bold md:text-6xl lg:text-7xl">
            Ihr Partner für Autoankauf,
            <br />
            -verkauf & Karosseriearbeiten
          </h1>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mb-8 text-xl md:text-2xl">
            An zwei Standorten in Pratteln und Dornach für Sie da
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/kontakt?type=verkauf">Auto verkaufen</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/fahrzeuge">Fahrzeuge ansehen</Link>
            </Button>
          </div>
        </FadeIn>

        <FadeIn delay={0.8}>
          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
            className="flex items-center gap-2 text-xl font-semibold hover:text-primary transition-colors"
          >
            <Phone className="h-6 w-6" />
            {CONTACT_PHONE}
          </a>
        </FadeIn>

        {/* Scroll Down Animation */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </div>
    </section>
  )
}

