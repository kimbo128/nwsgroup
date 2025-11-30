"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { AUTOSCOUT24_URL } from "@/lib/constants"
import { FadeIn } from "@/components/animations/fade-in"

interface Vehicle {
  id: string
  autoscoutId: string
  autoscoutUrl: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel: string
  transmission: string
  color?: string
  description?: string
  images: string[]
  status: string
  featured: boolean
}

export default function FahrzeugePage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    search: "",
    make: "",
    minPrice: 0,
    maxPrice: 500000,
    minYear: 2000,
    maxYear: new Date().getFullYear(),
    fuel: "",
  })

  const fetchVehicles = async () => {
    try {
      const response = await fetch("/api/vehicles")
      const data = await response.json()
      setVehicles(data)
      setFilteredVehicles(data)
    } catch (error) {
      console.error("Error fetching vehicles:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  const applyFilters = useCallback(() => {
    let filtered = [...vehicles]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (v) =>
          v.make.toLowerCase().includes(searchLower) ||
          v.model.toLowerCase().includes(searchLower)
      )
    }

    if (filters.make) {
      filtered = filtered.filter((v) => v.make === filters.make)
    }

    if (filters.fuel) {
      filtered = filtered.filter((v) => v.fuel === filters.fuel)
    }

    filtered = filtered.filter(
      (v) => v.price >= filters.minPrice && v.price <= filters.maxPrice
    )

    filtered = filtered.filter(
      (v) => v.year >= filters.minYear && v.year <= filters.maxYear
    )

    setFilteredVehicles(filtered)
  }, [vehicles, filters])

  useEffect(() => {
    applyFilters()
  }, [applyFilters])

  const uniqueMakes = Array.from(new Set(vehicles.map((v) => v.make))).sort()

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Fahrzeuge werden geladen...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <FadeIn>
        <h1 className="mb-6 sm:mb-8 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
          Unsere Fahrzeuge
        </h1>
      </FadeIn>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 sm:top-24 space-y-4 sm:space-y-6 rounded-lg border bg-card p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold">Filter</h2>

            <div>
              <Label htmlFor="search" className="text-sm">Suche</Label>
              <Input
                id="search"
                placeholder="Marke oder Modell..."
                value={filters.search}
                onChange={(e) =>
                  setFilters({ ...filters, search: e.target.value })
                }
                className="h-9 sm:h-10 text-sm"
              />
            </div>

            <div>
              <Label htmlFor="make" className="text-sm">Marke</Label>
              <Select
                id="make"
                value={filters.make}
                onChange={(e) =>
                  setFilters({ ...filters, make: e.target.value })
                }
                className="h-9 sm:h-10 text-sm"
              >
                <option value="">Alle Marken</option>
                {uniqueMakes.map((make) => (
                  <option key={make} value={make}>
                    {make}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <Label htmlFor="fuel" className="text-sm">Kraftstoff</Label>
              <Select
                id="fuel"
                value={filters.fuel}
                onChange={(e) =>
                  setFilters({ ...filters, fuel: e.target.value })
                }
                className="h-9 sm:h-10 text-sm"
              >
                <option value="">Alle</option>
                <option value="Benzin">Benzin</option>
                <option value="Diesel">Diesel</option>
                <option value="Elektro">Elektro</option>
                <option value="Hybrid">Hybrid</option>
              </Select>
            </div>

            <div>
              <Label className="text-sm">
                Preis: CHF {filters.minPrice.toLocaleString("de-CH")} - CHF{" "}
                {filters.maxPrice.toLocaleString("de-CH")}
              </Label>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minPrice: parseInt(e.target.value) || 0,
                    })
                  }
                  className="h-9 sm:h-10 text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxPrice: parseInt(e.target.value) || 500000,
                    })
                  }
                  className="h-9 sm:h-10 text-sm"
                />
              </div>
            </div>

            <div>
              <Label className="text-sm">
                Baujahr: {filters.minYear} - {filters.maxYear}
              </Label>
              <div className="space-y-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minYear}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minYear: parseInt(e.target.value) || 2000,
                    })
                  }
                  className="h-9 sm:h-10 text-sm"
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxYear}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxYear: parseInt(e.target.value) || new Date().getFullYear(),
                    })
                  }
                  className="h-9 sm:h-10 text-sm"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Vehicles Grid */}
        <div className="lg:col-span-3">
          <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <p className="text-sm sm:text-base text-muted-foreground">
              {filteredVehicles.length} Fahrzeug
              {filteredVehicles.length !== 1 ? "e" : ""} gefunden
            </p>
            <Button variant="outline" size="sm" className="w-full sm:w-auto h-9 sm:h-10 text-xs sm:text-sm" asChild>
              <Link href={AUTOSCOUT24_URL} target="_blank" rel="noopener noreferrer">
                Auf AutoScout24 ansehen
              </Link>
            </Button>
          </div>

          {filteredVehicles.length === 0 ? (
            <div className="py-12 sm:py-16 md:py-20 text-center text-muted-foreground">
              <p className="text-sm sm:text-base mb-4">Keine Fahrzeuge gefunden.</p>
              <Button className="h-9 sm:h-10 text-sm sm:text-base" asChild>
                <Link href={AUTOSCOUT24_URL} target="_blank" rel="noopener noreferrer">
                  Auf AutoScout24 ansehen
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredVehicles.map((vehicle, index) => (
                <FadeIn key={vehicle.id} delay={index * 0.05}>
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
                          <span className="text-xs sm:text-sm text-muted-foreground">Kein Bild</span>
                        </div>
                      )}
                      {vehicle.featured && (
                        <Badge className="absolute right-2 top-2 text-xs">NEU</Badge>
                      )}
                      {vehicle.status === "sold" && (
                        <Badge
                          variant="destructive"
                          className="absolute left-2 top-2 text-xs"
                        >
                          Verkauft
                        </Badge>
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
                        <p>
                          Kilometerstand: {vehicle.mileage.toLocaleString("de-CH")} km
                        </p>
                        <p>Kraftstoff: {vehicle.fuel}</p>
                        <p>Getriebe: {vehicle.transmission}</p>
                        {vehicle.color && <p>Farbe: {vehicle.color}</p>}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 sm:p-6 pt-0">
                      <Button className="w-full h-9 sm:h-10 text-xs sm:text-sm" asChild>
                        <Link href={vehicle.autoscoutUrl} target="_blank" rel="noopener noreferrer">
                          Details auf AutoScout24
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

