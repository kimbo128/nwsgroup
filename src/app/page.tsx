"use client"

import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { VehiclesSection } from "@/components/sections/vehicles-section"
import { LocationsPreview } from "@/components/sections/locations-preview"
import { ContactCTA } from "@/components/sections/contact-cta"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <>
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <Services />
        <VehiclesSection />
        <LocationsPreview />
        <ContactCTA />
      </div>
    </>
  )
}

