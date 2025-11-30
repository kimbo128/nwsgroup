"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ArrowUpRight, Facebook, Instagram, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import { CONTACT_PHONE, CONTACT_EMAIL, LOCATIONS } from "@/lib/constants"

const quickLinks = [
  { name: "Fahrzeuge", href: "/fahrzeuge" },
  { name: "Dienstleistungen", href: "/dienstleistungen" },
  { name: "Standorte", href: "/standorte" },
  { name: "Galerie", href: "/galerie" },
  { name: "Kontakt", href: "/kontakt" },
]

const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-black border-t-2 border-primary/30 overflow-hidden">
      {/* Decorative background - WCC Style */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `linear-gradient(rgba(255, 68, 0, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 68, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
      </div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-custom" />

      {/* Main Footer Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="NWS Group AG"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain group-hover:scale-110 transition-transform"
                />
                <motion.div
                  className="absolute inset-0 border-2 border-primary/50 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div>
                <span className="text-2xl font-display font-black block text-white">NWS GROUP</span>
                <span className="text-sm text-primary font-bold uppercase tracking-wider">Custom Autohandel</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
              Ihr vertrauenswürdiger Partner für Autoankauf, -verkauf und professionelle Karosseriearbeiten in der Region Basel.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 border-2 border-primary/30 hover:border-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-primary mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-bold text-white/80 hover:text-primary transition-colors uppercase tracking-wider"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-primary mb-6">
              Kontakt
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-sm font-bold text-white/80 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-primary" />
                  <span className="neon-orange">{CONTACT_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-start gap-3 text-sm font-bold text-white/80 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-primary" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm font-bold text-white/80">
                <Clock className="w-5 h-5 mt-0.5 text-primary" />
                <div>
                  <p>Mo-Fr: 08:00 - 18:00</p>
                  <p>Sa: 08:00 - 16:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-primary mb-6">
              Standorte
            </h4>
            <ul className="space-y-4">
              {LOCATIONS.map((location) => (
                <li key={location.id}>
                  <div className="flex items-start gap-3 text-sm font-bold text-white/80">
                    <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-primary font-black">{location.name}</p>
                      <p className="text-muted-foreground">{location.address}</p>
                      <p className="text-muted-foreground">{location.zip} {location.city}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t-2 border-primary/30">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground font-bold">
              © {currentYear} NWS Group AG. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-bold uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
