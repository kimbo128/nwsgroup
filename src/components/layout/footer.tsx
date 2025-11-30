import Link from "next/link"
import Image from "next/image"
import { LOCATIONS, WHATSAPP_GENERAL, TELEGRAM_BOT_URL } from "@/lib/constants"
import { Phone, Mail, MessageCircle, Send } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-3">
          {/* Column 1: Kontakt */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Kontakt</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="NWS Group AG"
                  width={32}
                  height={32}
                  className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
                />
                <span className="font-semibold text-sm sm:text-base">NWS Group AG</span>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <a
                  href="mailto:info@nwsgroup.ch"
                  className="flex items-center gap-2 hover:text-primary"
                >
                  <Mail className="h-4 w-4" />
                  info@nwsgroup.ch
                </a>
                {LOCATIONS.map((location) => (
                  <a
                    key={location.name}
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    {location.name}: {location.phone}
                  </a>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                {LOCATIONS.map((location) => (
                  <a
                    key={`whatsapp-${location.name}`}
                    href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 rounded-md border px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm hover:bg-accent"
                  >
                    <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    <span className="hidden sm:inline">WhatsApp </span>{location.name}
                  </a>
                ))}
                <a
                  href={`https://wa.me/${WHATSAPP_GENERAL.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 rounded-md border px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm hover:bg-accent"
                >
                  <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  WhatsApp
                </a>
                <a
                  href={TELEGRAM_BOT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 sm:gap-2 rounded-md border px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm hover:bg-accent"
                >
                  <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Telegram
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/fahrzeuge" className="hover:text-primary">
                  Fahrzeuge
                </Link>
              </li>
              <li>
                <Link href="/dienstleistungen" className="hover:text-primary">
                  Dienstleistungen
                </Link>
              </li>
              <li>
                <Link href="/standorte" className="hover:text-primary">
                  Standorte
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="hover:text-primary">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="hover:text-primary">
                  Kontakt
                </Link>
              </li>
              <li className="pt-4">
                <Link href="/impressum" className="hover:text-primary">
                  Impressum
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-primary">
                  Datenschutzerklärung
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Öffnungszeiten */}
          <div>
            <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold">Öffnungszeiten</h3>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              {LOCATIONS.map((location) => (
                <div key={location.name}>
                  <div className="font-semibold">{location.name}</div>
                  <div className="text-muted-foreground">
                    {location.hours.weekdays}
                    {location.hours.saturday && <br />}
                    {location.hours.saturday}
                    {location.hours.sunday && <br />}
                    {location.hours.sunday}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2025 NWS Group AG - Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  )
}

