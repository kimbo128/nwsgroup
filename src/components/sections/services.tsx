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
      {/* Background decoration - WCC Style */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255, 68, 0, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 68, 0, 0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn>
          <div className="text-center mb-16">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-5 py-2 rounded-full bg-primary/20 border-2 border-primary/50 text-primary text-sm font-black uppercase tracking-wider mb-4 shadow-neon-orange"
            >
              Unsere Services
            </motion.span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-black mb-4">
              WAS WIR FÜR SIE{" "}
              <span className="gradient-custom">TUN KÖNNEN</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Professionelle Dienstleistungen rund ums Auto - von Ankauf bis Karosseriearbeiten
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Car

            return (
              <FadeIn key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="group h-full"
                >
                  <Link href={service.link} className="block h-full">
                    <div className="relative h-full rounded-xl border-2 border-primary/30 bg-card/60 backdrop-blur-sm p-6 sm:p-8 overflow-hidden transition-all duration-500 hover:border-primary hover:shadow-custom-lg">
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Custom corner accent */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full" />
                      
                      {/* Top accent line */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-custom opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="mb-6 relative">
                          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/50 group-hover:from-primary/40 group-hover:to-primary/20 transition-all duration-300 shadow-neon-orange group-hover:shadow-neon-orange">
                            <Icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                          </div>
                          
                          {/* Pulse effect */}
                          <motion.div
                            className="absolute inset-0 w-16 h-16 rounded-xl border-2 border-primary/50"
                            animate={{
                              scale: [1, 1.3, 1],
                              opacity: [0.5, 0, 0.5],
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
                          <h3 className="text-2xl sm:text-3xl font-display font-black group-hover:text-primary transition-colors flex items-center gap-2 uppercase">
                            {service.title}
                            <ArrowUpRight className="h-6 w-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                          </h3>
                          <p className="text-muted-foreground leading-relaxed font-medium">
                            {service.description}
                          </p>
                        </div>

                        {/* Bottom link indicator */}
                        <div className="mt-6 flex items-center gap-2 text-sm font-black text-primary opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 uppercase tracking-wider">
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
