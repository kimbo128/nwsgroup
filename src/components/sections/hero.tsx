"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight } from "lucide-react"
import { CONTACT_PHONE } from "@/lib/constants"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-muted/20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Hero Card with Image */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border/50">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/header.png"
                alt="NWS Group AG"
                fill
                className="object-cover object-center brightness-105"
                sizes="100vw"
                priority
              />
              {/* Light Overlay - Bild soll klar sichtbar sein */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center text-center p-6 sm:p-10 md:p-16 lg:p-20">
              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl text-white drop-shadow-2xl"
              >
                Ihr Partner für{" "}
                <span className="text-primary">Autoankauf</span>,<br />
                Verkauf & Karosserie
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-10 text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl font-medium drop-shadow-lg"
              >
                An zwei Standorten in Pratteln und Dornach für Sie da
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
              >
                <Button 
                  size="lg" 
                  className="group h-12 px-8 text-base font-semibold"
                  asChild
                >
                  <Link href="/kontakt?type=verkauf" className="flex items-center gap-2">
                    Auto verkaufen
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group h-12 px-8 text-base font-semibold"
                  asChild
                >
                  <a 
                    href="https://www.autoscout24.ch/de/s/seller-2328369"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Fahrzeuge ansehen
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                </Button>
              </motion.div>

              {/* Phone Number */}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-lg sm:text-xl font-semibold text-white hover:text-primary transition-colors drop-shadow-lg"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </span>
                {CONTACT_PHONE}
              </motion.a>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { value: "25+", label: "Jahre Erfahrung" },
              { value: "5000+", label: "Zufriedene Kunden" },
              { value: "2", label: "Standorte" },
              { value: "100%", label: "Faire Preise" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-lg border bg-card p-6 text-center hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
