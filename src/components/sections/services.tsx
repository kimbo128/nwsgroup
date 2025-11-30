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
    <section className="py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn>
          <h2 className="mb-8 sm:mb-10 md:mb-12 text-center text-2xl sm:text-3xl md:text-4xl font-bold">
            Unsere Dienstleistungen
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Car

            return (
              <FadeIn key={service.id} delay={index * 0.1} direction="scale">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardHeader className="p-4 sm:p-6">
                      <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg sm:text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-sm">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
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

