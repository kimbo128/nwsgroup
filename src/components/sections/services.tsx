"use client"

import Link from "next/link"
import { SERVICES } from "@/lib/constants"
import { FadeIn } from "@/components/animations/fade-in"
import { Car, ShoppingCart, Wrench, Users, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const iconMap = {
  Car,
  ShoppingCart,
  Wrench,
  Users,
}

export function Services() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4"
            >
              Unsere Services
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              Was wir für Sie{" "}
              <span className="gradient-text">tun können</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professionelle Dienstleistungen rund ums Auto - von Ankauf bis Karosseriearbeiten
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Car
            const isLarge = index === 0 || index === 3

            return (
              <FadeIn key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className={`group h-full ${isLarge ? 'md:row-span-1' : ''}`}
                >
                  <Link href={service.link} className="block h-full">
                    <div className="relative h-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-primary/30 hover:shadow-premium-lg">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Decorative corner accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="mb-6 relative">
                          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                            <Icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          
                          {/* Pulse effect */}
                          <motion.div
                            className="absolute inset-0 w-14 h-14 rounded-2xl bg-primary/20"
                            animate={{
                              scale: [1, 1.5, 1],
                              opacity: [0.3, 0, 0.3],
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: index * 0.5,
                            }}
                          />
                        </div>

                        {/* Content */}
                        <div className="space-y-3">
                          <h3 className="text-xl sm:text-2xl font-display font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                            {service.title}
                            <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {service.description}
                          </p>
                        </div>

                        {/* Bottom link indicator */}
                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <span>Mehr erfahren</span>
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
