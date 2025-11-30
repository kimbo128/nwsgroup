"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, Sparkles } from "lucide-react"
import { CONTACT_PHONE } from "@/lib/constants"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary/20 via-transparent to-transparent"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-accent/15 via-transparent to-transparent"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Hero Card with Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-premium-lg">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/header.png"
                alt="NWS Group AG"
                fill
                className="object-cover object-center scale-105"
                sizes="100vw"
                priority
              />
              {/* Premium Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-navy-dark/90 via-navy/80 to-navy-dark/90" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
              
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-premium" />
              <motion.div
                className="absolute top-10 right-10 w-32 h-32 border border-primary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-20 left-10 w-24 h-24 border border-accent/20 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-[70vh] flex flex-col items-center justify-center text-center text-white p-6 sm:p-10 md:p-16 lg:p-20">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Seit 1999 Ihr Vertrauen
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display leading-[1.1] tracking-tight max-w-5xl"
              >
                Ihr Partner für{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">Autoankauf</span>
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-premium rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span>
                ,<br />
                Verkauf & Karosserie
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-10 text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl font-light"
              >
                An zwei Standorten in{" "}
                <span className="text-primary font-medium">Pratteln</span> und{" "}
                <span className="text-accent font-medium">Dornach</span> für Sie da
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
              >
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-base font-semibold rounded-xl shadow-glow transition-all duration-300 hover:shadow-glow hover:scale-105"
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
                  className="group h-14 px-8 text-base font-semibold rounded-xl border-2 border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/50 transition-all duration-300"
                  asChild
                >
                  <Link href="/fahrzeuge" className="flex items-center gap-2">
                    Fahrzeuge ansehen
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </Button>
              </motion.div>

              {/* Phone Number */}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-3 text-lg sm:text-xl font-semibold text-white/90 hover:text-primary transition-colors"
              >
                <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-all">
                  <Phone className="w-5 h-5" />
                </span>
                {CONTACT_PHONE}
              </motion.a>
            </div>
          </div>

          {/* Bottom Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
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
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-2xl bg-card/80 backdrop-blur-md border border-border/50 p-6 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-premium"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-2xl sm:text-3xl font-display font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
