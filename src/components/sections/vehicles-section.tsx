"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { AUTOSCOUT24_URL } from "@/lib/constants"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Vehicle {
  id: string
  make: string
  model: string
  price: number
  year: number
  mileage: number
  fuel: string
  images: string[]
  featured: boolean
}

export function VehiclesSection() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/vehicles?featured=true&limit=4")
      if (response.ok) {
        const data = await response.json()
        setVehicles(data)
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-muted/50 py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="mb-8 sm:mb-10 md:mb-12 text-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="inline-block"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display bg-gradient-to-r from-primary via-primary/90 to-primary bg-clip-text text-transparent">
                Unsere aktuellen Fahrzeuge
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-2 text-sm text-muted-foreground"
            >
              ✨ Täglich aktualisiert von AutoScout24
            </motion.p>
          </div>
        </FadeIn>

        {vehicles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
              {vehicles.map((vehicle, index) => (
                <FadeIn key={vehicle.id} delay={index * 0.1} direction="scale">
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative h-40 sm:h-48 w-full">
                      {vehicle.images.length > 0 ? (
                        <Image
                          src={vehicle.images[0]}
                          alt={`${vehicle.make} ${vehicle.model}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-muted">
                          <span className="text-muted-foreground">Kein Bild</span>
                        </div>
                      )}
                      {vehicle.featured && (
                        <Badge className="absolute right-2 top-2">NEU</Badge>
                      )}
                    </div>
                    <CardHeader className="p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl font-semibold">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-primary">
                        CHF {vehicle.price.toLocaleString("de-CH")}
                      </p>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="space-y-1 text-xs sm:text-sm text-muted-foreground">
                        <p>Baujahr: {vehicle.year}</p>
                        <p>Kilometerstand: {vehicle.mileage.toLocaleString("de-CH")} km</p>
                        <p>Kraftstoff: {vehicle.fuel}</p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 sm:p-6 pt-0">
                      <Button className="w-full h-9 sm:h-10 text-sm sm:text-base" asChild>
                        <Link href={`/fahrzeuge#${vehicle.id}`}>Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.5}>
              <div className="mt-12 text-center">
                <Button size="lg" variant="outline" asChild>
                  <Link href={AUTOSCOUT24_URL} target="_blank" rel="noopener noreferrer">
                    Alle Fahrzeuge auf AutoScout24 ansehen
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </>
        ) : (
          <div className="text-center text-muted-foreground">
            <p>Derzeit sind keine Fahrzeuge verfügbar.</p>
            <Button className="mt-4" asChild>
              <Link href={AUTOSCOUT24_URL} target="_blank" rel="noopener noreferrer">
                Auf AutoScout24 ansehen
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

