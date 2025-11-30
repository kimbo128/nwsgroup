"use client"

import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Send } from "lucide-react"
import { LOCATIONS, WHATSAPP_GENERAL, TELEGRAM_BOT_URL } from "@/lib/constants"
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export function ContactButtons({ variant = "default" }: { variant?: "default" | "compact" }) {
  const isCompact = variant === "compact"

  return (
    <div className={`flex items-center gap-2 ${isCompact ? "flex-wrap" : ""}`}>
      {/* Phone Dropdown */}
      <DropdownMenu
        trigger={
          <Button variant="outline" size={isCompact ? "sm" : "default"}>
            <Phone className="h-4 w-4 mr-2" />
            {!isCompact && "Anrufen"}
          </Button>
        }
      >
        {LOCATIONS.map((location) => (
          <DropdownMenuItem key={location.name}>
            <a
              href={`tel:${location.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 w-full"
            >
              <Phone className="h-4 w-4" />
              <div>
                <div className="font-medium">{location.name}</div>
                <div className="text-xs text-muted-foreground">{location.phone}</div>
              </div>
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenu>

      {/* WhatsApp Dropdown */}
      <DropdownMenu
        trigger={
          <Button variant="outline" size={isCompact ? "sm" : "default"}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {!isCompact && "WhatsApp"}
          </Button>
        }
      >
        {LOCATIONS.map((location) => (
          <DropdownMenuItem key={`whatsapp-${location.name}`}>
            <a
              href={`https://wa.me/${location.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full"
            >
              <MessageCircle className="h-4 w-4" />
              <div>
                <div className="font-medium">WhatsApp {location.name}</div>
                <div className="text-xs text-muted-foreground">{location.phone}</div>
              </div>
            </a>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem>
          <a
            href={`https://wa.me/${WHATSAPP_GENERAL.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 w-full"
          >
            <MessageCircle className="h-4 w-4" />
            <div>
              <div className="font-medium">WhatsApp Allgemein</div>
              <div className="text-xs text-muted-foreground">{WHATSAPP_GENERAL}</div>
            </div>
          </a>
        </DropdownMenuItem>
      </DropdownMenu>

      {/* Telegram Bot */}
      <Button
        variant="outline"
        size={isCompact ? "sm" : "default"}
        asChild
      >
        <a
          href={TELEGRAM_BOT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          {!isCompact && <span className="hidden sm:inline">Telegram</span>}
        </a>
      </Button>
    </div>
  )
}

