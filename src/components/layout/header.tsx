"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactButtons } from "./contact-buttons"
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"

const navigation = [
  { name: "Fahrzeuge", href: "/fahrzeuge" },
  { name: "Dienstleistungen", href: "/dienstleistungen" },
  { name: "Standorte", href: "/standorte" },
  { name: "Galerie", href: "/galerie" },
  { name: "Kontakt", href: "/kontakt" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <nav className="flex h-14 sm:h-16 items-center justify-between rounded-xl sm:rounded-2xl border-2 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-modern-lg mt-2 sm:mt-3 px-3 sm:px-4 ring-1 ring-black/5">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="NWS Group AG Logo"
            width={80}
            height={80}
            className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:space-x-4 lg:space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium transition-colors hover:text-primary px-2 py-1 rounded-md hover:bg-accent/50"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="h-9 w-9 sm:h-10 sm:w-10"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          )}

          {/* Contact Buttons - Desktop */}
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <ContactButtons variant="compact" />
          </div>

          {/* User Menu / Login */}
          {session ? (
            <DropdownMenu
              trigger={
                <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              }
            >
              <DropdownMenuItem>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => signOut()}>
                Abmelden
              </DropdownMenuItem>
            </DropdownMenu>
          ) : (
            <Button variant="outline" size="sm" asChild className="hidden sm:flex h-9 text-xs sm:text-sm px-3">
              <Link href="/login">Anmelden</Link>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 mt-2">
          <div className="rounded-lg sm:rounded-xl border bg-background/95 backdrop-blur shadow-sm px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 border-t mt-3">
              <ContactButtons variant="compact" />
            </div>
            {!session && (
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                    Anmelden
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

