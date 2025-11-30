"use client"

import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { VehiclesSection } from "@/components/sections/vehicles-section"
import { LocationsPreview } from "@/components/sections/locations-preview"
import { ContactCTA } from "@/components/sections/contact-cta"

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <Services />
      <VehiclesSection />
      <LocationsPreview />
      <ContactCTA />
    </div>
  )
}
