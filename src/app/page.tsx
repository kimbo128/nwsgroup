"use client"

import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { VehiclesSection } from "@/components/sections/vehicles-section"
import { LocationsPreview } from "@/components/sections/locations-preview"
import { ContactCTA } from "@/components/sections/contact-cta"

export default function HomePage() {
  return (
    <div className="relative">
      {/* Premium background texture */}
      <div className="fixed inset-0 pointer-events-none z-0 grain opacity-50" />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <Services />
        <VehiclesSection />
        <LocationsPreview />
        <ContactCTA />
      </div>
    </div>
  )
}
