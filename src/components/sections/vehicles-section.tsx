import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FadeIn } from "@/components/animations/fade-in"
import { AUTOSCOUT24_URL } from "@/lib/constants"
import { prisma } from "@/lib/db"

export async function VehiclesSection() {
  // Fetch featured vehicles
  const vehicles = await prisma.vehicle.findMany({
    where: {
      status: "available",
      featured: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <section className="bg-muted/50 py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Unsere aktuellen Fahrzeuge
          </h2>
        </FadeIn>

        {vehicles.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {vehicles.map((vehicle, index) => (
                <FadeIn key={vehicle.id} delay={index * 0.1}>
                  <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                    <div className="relative h-48 w-full">
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
                    <CardHeader>
                      <h3 className="text-xl font-semibold">
                        {vehicle.make} {vehicle.model}
                      </h3>
                      <p className="text-2xl font-bold text-primary">
                        CHF {vehicle.price.toLocaleString("de-CH")}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Baujahr: {vehicle.year}</p>
                        <p>Kilometerstand: {vehicle.mileage.toLocaleString("de-CH")} km</p>
                        <p>Kraftstoff: {vehicle.fuel}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" asChild>
                        <Link href={`/fahrzeuge#${vehicle.id}`}>Details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
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

