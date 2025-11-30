"use client"

import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { VehiclesCTA } from "@/components/sections/vehicles-cta"
import { LocationsPreview } from "@/components/sections/locations-preview"
import { ContactCTA } from "@/components/sections/contact-cta"

export default function HomePage() {
  return (
    <div className="relative">
      <Hero />
      <Services />
      <VehiclesCTA />
      <LocationsPreview />
      <ContactCTA />
    </div>
  )
}
