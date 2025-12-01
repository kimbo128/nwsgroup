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
import { motion, AnimatePresence } from "framer-motion"

const navigation = [
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
      <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 sm:pt-4">
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex h-20 items-center justify-between px-4 sm:px-8 transition-all duration-300 border-b ${
            scrolled 
              ? 'bg-background/90 backdrop-blur-xl border-border shadow-lg' 
              : 'bg-background/40 backdrop-blur-md border-white/5 sm:rounded-none sm:border-none'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-4 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/logo.png"
                alt="NWS Group AG Logo"
                width={52}
                height={52}
                className="relative h-12 w-12 sm:h-14 sm:w-14 object-contain"
              />
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-black tracking-tighter uppercase block leading-none italic">NWS Group</span>
              <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase block mt-1">Customs</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative py-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="h-9 w-9 rounded-none hover:bg-primary/10"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            )}

            {/* Contact Buttons - Desktop */}
            <div className="hidden xl:flex xl:items-center xl:gap-2">
              <ContactButtons variant="compact" />
            </div>

            {/* User Menu / Login */}
            {session ? (
              <DropdownMenu
                align="end"
                trigger={
                  <Button variant="ghost" size="icon" className="h-9 w-9 rounded-none">
                    <User className="h-5 w-5" />
                  </Button>
                }
              >
                <Link href="/dashboard" className="block w-full">
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => signOut()}>
                  Abmelden
                </DropdownMenuItem>
              </DropdownMenu>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                asChild 
                className="hidden sm:flex font-bold uppercase tracking-wider"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}

            {/* CTA Button - Desktop */}
            <Button 
              size="sm" 
              asChild 
              className="hidden md:flex skew-x-[-12deg] font-black uppercase tracking-wider px-6 hover:bg-primary/90"
            >
              <Link href="/kontakt?type=verkauf">
                <span className="skew-x-[12deg]">Verkaufen</span>
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
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
            className="lg:hidden fixed inset-x-0 top-20 bg-background/95 backdrop-blur-xl border-b border-border shadow-2xl overflow-hidden z-40"
          >
            <div className="p-4 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-3 text-lg font-bold uppercase tracking-widest hover:bg-primary/10 hover:text-primary transition-colors border-l-2 border-transparent hover:border-primary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-6 mt-6 border-t border-border/50 space-y-4">
                <div className="px-4">
                  <ContactButtons variant="full" />
                </div>
                
                <div className="grid grid-cols-2 gap-3 px-4">
                  {!session && (
                    <Button variant="outline" className="w-full uppercase font-bold tracking-wider" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Login
                      </Link>
                    </Button>
                  )}
                  <Button className="w-full uppercase font-black tracking-wider" asChild>
                    <Link href="/kontakt?type=verkauf" onClick={() => setMobileMenuOpen(false)}>
                      Verkaufen
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
