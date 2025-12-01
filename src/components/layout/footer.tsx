"use client"

import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react"
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
    <footer className="relative border-t-2 border-muted-foreground/10 bg-muted/5">
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <Image
                src="/logo.png"
                alt="NWS Group AG"
                width={96}
                height={96}
                className="h-24 w-24 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              {/* Text removed as requested */}
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 font-medium">
              Ihr Partner für Autoankauf, -verkauf und professionelle Karosseriearbeiten.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-foreground">Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-foreground">Kontakt</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
                  className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-foreground group-hover:text-primary transition-colors" />
                  <span className="font-bold tracking-wide">{CONTACT_PHONE}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="group flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-foreground group-hover:text-primary transition-colors" />
                  <span className="font-bold tracking-wide">{CONTACT_EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <Clock className="w-5 h-5 mt-0.5 text-foreground" />
                <div className="font-medium">
                  <p>Mo-Fr: 08:00 - 18:00</p>
                  <p>Sa: 08:00 - 16:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest mb-6 text-foreground">Standorte</h4>
            <ul className="space-y-6">
              {LOCATIONS.map((location) => (
                <li key={location.id}>
                  <div className="flex items-start gap-3 text-sm text-muted-foreground group">
                    <MapPin className="w-5 h-5 mt-0.5 text-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    <div>
                      <p className="font-black text-foreground uppercase tracking-wide">{location.name}</p>
                      <p className="font-medium">{location.address}</p>
                      <p className="font-medium">{location.zip} {location.city}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-muted-foreground/10">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              © {currentYear} NWS Group AG.
            </p>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs font-bold text-muted-foreground hover:text-foreground uppercase tracking-widest transition-colors"
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
