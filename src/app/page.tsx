import { Hero } from "@/components/sections/hero"
import { Services } from "@/components/sections/services"
import { VehiclesSection } from "@/components/sections/vehicles-section"
import { LocationsPreview } from "@/components/sections/locations-preview"
import { ContactCTA } from "@/components/sections/contact-cta"

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <VehiclesSection />
      <LocationsPreview />
      <ContactCTA />
    </>
  )
}

