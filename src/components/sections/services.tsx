"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SERVICES } from "@/lib/constants"
import { FadeIn } from "@/components/animations/fade-in"
import { Car, ShoppingCart, Wrench, Users, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { FloatingIcon } from "@/components/animations/floating-elements"

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
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                  <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 group">
                    <CardHeader className="p-4 sm:p-6">
                      <FloatingIcon delay={index * 0.2}>
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 md:h-14 md:w-14 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300 relative">
                          <Icon className="h-6 w-6 text-primary md:h-7 md:w-7 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                          <motion.div
                            className="absolute inset-0 rounded-xl bg-primary/20"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                            }}
                          />
                        </div>
                      </FloatingIcon>
                      <CardTitle className="text-xl md:text-2xl font-bold mb-2 flex items-center gap-2">
                        {service.title}
                        {index === 0 && (
                          <motion.span
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                          >
                            <Sparkles className="h-4 w-4 text-accent" />
                          </motion.span>
                        )}
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
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

