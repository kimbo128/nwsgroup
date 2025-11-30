"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone, ArrowRight, Zap } from "lucide-react"
import { CONTACT_PHONE } from "@/lib/constants"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated Background - WCC Style */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-orange/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-green/20 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255, 68, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 68, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
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
          <div className="relative rounded-2xl overflow-hidden shadow-custom-lg border border-primary/30">
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
              {/* Dark Overlay with Custom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
              
              {/* Custom Accent Lines */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-custom" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-custom" />
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center text-center text-white p-6 sm:p-10 md:p-16 lg:p-20">
              {/* Badge - WCC Style */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border-2 border-primary/50 text-primary font-bold text-sm uppercase tracking-wider shadow-neon-orange">
                  <Zap className="w-4 h-4" />
                  Custom. Premium. Legendär.
                </span>
              </motion.div>

              {/* Main Heading - BOLD & CUSTOM */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7 }}
                className="mb-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display leading-[1.1] tracking-tight max-w-5xl"
              >
                <span className="block mb-2">IHR PARTNER FÜR</span>
                <span className="block gradient-custom neon-orange">AUTOANKAUF</span>
                <span className="block">VERKAUF & KAROSSERIE</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mb-12 text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl font-medium"
              >
                An zwei Standorten in{" "}
                <span className="text-primary font-bold">Pratteln</span> und{" "}
                <span className="text-accent font-bold">Dornach</span> für Sie da
              </motion.p>

              {/* CTA Buttons - CUSTOM STYLE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
              >
                <Button 
                  size="xl" 
                  className="group relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground h-16 px-10 text-lg font-black uppercase tracking-wider rounded-xl shadow-neon-orange hover:shadow-neon-orange transition-all duration-300 hover:scale-105 btn-glow"
                  asChild
                >
                  <Link href="/kontakt?type=verkauf" className="flex items-center gap-3">
                    Auto verkaufen
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="xl" 
                  variant="outline" 
                  className="group h-16 px-10 text-lg font-black uppercase tracking-wider rounded-xl border-2 border-white/30 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:border-primary transition-all duration-300 hover:scale-105"
                  asChild
                >
                  <Link href="/fahrzeuge" className="flex items-center gap-3">
                    Fahrzeuge ansehen
                    <ArrowRight className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </Button>
              </motion.div>

              {/* Phone Number - CUSTOM */}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                className="group flex items-center gap-4 text-xl sm:text-2xl font-bold text-white hover:text-primary transition-colors"
              >
                <span className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 backdrop-blur-md border-2 border-primary/50 group-hover:bg-primary/30 group-hover:border-primary transition-all shadow-neon-orange">
                  <Phone className="w-6 h-6" />
                </span>
                <span className="neon-orange">{CONTACT_PHONE}</span>
              </motion.a>
            </div>
          </div>

          {/* Bottom Stats Bar - WCC STYLE */}
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
              { value: "100%", label: "Custom Service" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="group relative overflow-hidden rounded-xl bg-card/80 backdrop-blur-md border-2 border-primary/30 p-6 text-center hover:border-primary transition-all duration-300 hover:shadow-neon-orange"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-3xl sm:text-4xl font-display font-black gradient-custom mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
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
