"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SERVICES } from "@/lib/constants"
import { FadeIn } from "@/components/animations/fade-in"
import { Car, ShoppingCart, Wrench, Users } from "lucide-react"
import { motion } from "framer-motion"

const iconMap = {
  Car,
  ShoppingCart,
  Wrench,
  Users,
}

export function Services() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Unsere Dienstleistungen
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Car

            return (
              <FadeIn key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{service.title}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link
                        href={service.link}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Mehr erfahren →
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}

