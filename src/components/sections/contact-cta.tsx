"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import { MessageCircle, Mail, ArrowRight, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/constants"

export function ContactCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Premium gradient background - WCC Style */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-black" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/15 rounded-full blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255, 68, 0, 0.2) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 68, 0, 0.2) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Accent Lines */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-custom" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-custom" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border-2 border-primary/50 text-primary font-black text-sm uppercase tracking-wider shadow-neon-orange">
                <Zap className="w-4 h-4" />
                Wir antworten schnell
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white mb-4"
            >
              HABEN SIE{" "}
              <span className="gradient-custom">FRAGEN?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-white/70 mb-10 max-w-xl mx-auto font-medium"
            >
              Kontaktieren Sie uns - unser Team steht Ihnen jederzeit zur Verfügung
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="xl"
                className="group w-full sm:w-auto h-16 px-10 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-wider shadow-neon-orange hover:shadow-neon-orange transition-all hover:scale-105"
                asChild
              >
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3">
                  <Mail className="w-6 h-6" />
                  E-Mail schreiben
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
              </Button>
              
              <Button
                size="xl"
                variant="outline"
                className="group w-full sm:w-auto h-16 px-10 rounded-xl border-2 border-primary/50 bg-black/40 backdrop-blur-md text-white hover:bg-black/60 hover:border-primary font-black uppercase tracking-wider transition-all hover:scale-105"
                asChild
              >
                <a 
                  href={`https://wa.me/${WHATSAPP_NUMBER}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <MessageCircle className="w-6 h-6" />
                  WhatsApp Chat
                </a>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/50 font-bold uppercase tracking-wider"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-neon-orange" />
                <span>Schnelle Antwort</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-neon-orange" />
                <span>Unverbindliche Beratung</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary shadow-neon-orange" />
                <span>Faire Preise</span>
              </div>
            </motion.div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
