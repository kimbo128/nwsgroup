"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, User, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactButtons } from "./contact-buttons"
import {
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
  { name: "Fahrzeuge", href: "/fahrzeuge" },
  { name: "Dienstleistungen", href: "/dienstleistungen" },
  { name: "Standorte", href: "/standorte" },
  { name: "Galerie", href: "/galerie" },
  { name: "Kontakt", href: "/kontakt" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { data: session } = useSession()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark")
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 pt-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex h-18 sm:h-20 md:h-22 items-center justify-between rounded-xl px-4 sm:px-6 transition-all duration-500 border-2 ${
            scrolled 
              ? 'bg-black/95 backdrop-blur-xl shadow-custom-lg border-primary/50' 
              : 'bg-black/60 backdrop-blur-md border-primary/30'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="NWS Group AG Logo"
                width={56}
                height={56}
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <motion.div
                className="absolute inset-0 border-2 border-primary/50 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-display font-black tracking-tight text-white">NWS GROUP</span>
              <span className="block text-xs text-primary font-bold uppercase tracking-wider -mt-0.5">Custom Autohandel</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative px-4 py-2 text-sm font-bold text-white/80 hover:text-primary transition-colors uppercase tracking-wider group"
              >
                {item.name}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full shadow-neon-orange" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="h-10 w-10 rounded-xl hover:bg-primary/20 border border-primary/30"
              >
                <motion.div
                  key={resolvedTheme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {resolvedTheme === "dark" ? (
                    <Sun className="h-5 w-5 text-primary" />
                  ) : (
                    <Moon className="h-5 w-5 text-white" />
                  )}
                </motion.div>
              </Button>
            )}

            {/* Contact Buttons - Desktop */}
            <div className="hidden xl:flex xl:items-center xl:gap-2">
              <ContactButtons variant="compact" />
            </div>

            {/* User Menu / Login */}
            {session ? (
              <DropdownMenu
                trigger={
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-primary/20 border border-primary/30">
                    <User className="h-5 w-5 text-white" />
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
              <Button 
                variant="outline" 
                size="sm" 
                asChild 
                className="hidden sm:flex h-10 px-5 rounded-xl border-2 border-primary/50 bg-black/40 text-white hover:bg-primary/20 hover:border-primary font-bold uppercase tracking-wider text-xs transition-all"
              >
                <Link href="/login">Anmelden</Link>
              </Button>
            )}

            {/* CTA Button - Desktop */}
            <Button 
              size="sm" 
              asChild 
              className="hidden md:flex h-10 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-neon-orange hover:shadow-neon-orange font-black uppercase tracking-wider text-xs transition-all hover:scale-105"
            >
              <Link href="/kontakt?type=verkauf">Auto verkaufen</Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-xl border border-primary/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mobileMenuOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5 text-primary" />
                  ) : (
                    <Menu className="h-5 w-5 text-white" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 mt-2 overflow-hidden"
          >
            <div className="rounded-xl border-2 border-primary/50 bg-black/95 backdrop-blur-xl shadow-custom-lg p-4 space-y-1">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-bold uppercase tracking-wider hover:bg-primary/20 hover:text-primary transition-colors border border-transparent hover:border-primary/50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4 -rotate-90 text-primary" />
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-primary/30 space-y-3">
                <ContactButtons variant="compact" />
                
                <div className="grid grid-cols-2 gap-2">
                  {!session && (
                    <Button variant="outline" className="w-full rounded-xl border-2 border-primary/50 bg-black/40 text-white font-bold uppercase text-xs" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Anmelden
                      </Link>
                    </Button>
                  )}
                  <Button className="w-full rounded-xl bg-primary text-primary-foreground font-black uppercase text-xs shadow-neon-orange" asChild>
                    <Link href="/kontakt?type=verkauf" onClick={() => setMobileMenuOpen(false)}>
                      Auto verkaufen
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
