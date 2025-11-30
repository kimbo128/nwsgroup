"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { MessageCircle, Mail, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/constants"

export function ContactCTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            >
              Haben Sie Fragen?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto"
            >
              Kontaktieren Sie uns - unser Team steht Ihnen jederzeit zur Verfügung
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="lg"
                className="group w-full sm:w-auto"
                asChild
              >
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  E-Mail schreiben
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className="group w-full sm:w-auto"
                asChild
              >
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Chat
                </a>
              </Button>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
