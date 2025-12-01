"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Gauge, Trophy, MapPin, Percent } from "lucide-react"
import { motion } from "framer-motion"

export function Hero() {
  return (
    <section className="relative min-h-[95vh] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Parallax Effect Idea */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/header.png"
          alt="NWS Group AG Customs"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        {/* Aggressive Overlays for Depth */}
        <div className="absolute inset-0 bg-black/50 dark:bg-black/70 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.05] dark:opacity-[0.1]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-12 lg:gap-6">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="flex-1 text-center lg:text-left"
          >
            <div className="inline-block mb-6 px-6 py-2 border-l-4 border-primary bg-background/90 backdrop-blur-md text-foreground font-black uppercase tracking-[0.3em] text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
              Premium Automotive Services
            </div>
            
            <h1 className="mb-8 text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] italic">
              <span className="block">Dream It.</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary bg-[length:200%_auto] animate-gradient">Drive It.</span>
            </h1>

            <p className="mb-10 text-lg sm:text-xl text-gray-100 dark:text-gray-300 max-w-2xl font-bold uppercase tracking-wide mx-auto lg:mx-0 drop-shadow-md bg-black/30 backdrop-blur-sm p-4 border-l-2 border-white/20">
              Ihr Partner für exklusiven Autoankauf, Verkauf & professionelle Karosseriearbeiten in Pratteln und Dornach.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <Button 
                size="lg" 
                className="h-16 px-12 text-xl font-black skew-x-[-12deg] hover:skew-x-0 transition-all hover:scale-105 shadow-[0_0_30px_rgba(var(--primary),0.4)] border-0"
                asChild
              >
                <Link href="/kontakt?type=verkauf">
                  <span className="skew-x-[12deg] block">JETZT VERKAUFEN</span>
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-16 px-12 text-xl font-black skew-x-[-12deg] hover:skew-x-0 transition-all bg-white/5 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-black hover:border-white"
                asChild
              >
                <a 
                  href="https://www.autoscout24.ch/de/s/seller-2328369"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="skew-x-[12deg] block">FAHRZEUGE</span>
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats / Info Box - Stylized as Tech Specs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
            className="w-full lg:w-auto"
          >
            <div className="grid grid-cols-2 gap-4 lg:w-[400px]">
              {[
                { icon: Trophy, value: "25+", label: "Years Exp." },
                { icon: Gauge, value: "5000+", label: "Vehicles" },
                { icon: MapPin, value: "2", label: "Locations" },
                { icon: Percent, value: "100%", label: "Fair Play" },
              ].map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="bg-black/90 dark:bg-black/80 border-2 border-white/10 p-6 backdrop-blur-md hover:border-primary transition-all group cursor-default skew-x-[-6deg] hover:-translate-y-1 shadow-lg"
                >
                  <div className="skew-x-[6deg]">
                    <stat.icon className="w-8 h-8 text-primary group-hover:text-white mb-3 transition-colors" />
                    <div className="text-4xl font-black text-white tracking-tighter leading-none mb-1">{stat.value}</div>
                    <div className="text-[10px] font-black text-gray-400 group-hover:text-primary uppercase tracking-[0.25em]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Strip Design Element */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-white to-primary opacity-80" />
    </section>
  )
}
