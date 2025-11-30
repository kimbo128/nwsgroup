"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FadeIn } from "@/components/animations/fade-in"
import Link from "next/link"
import {
  FileText,
  Calendar,
  Heart,
  User,
  LogOut,
  Car,
  MessageSquare,
} from "lucide-react"
import { signOut } from "next-auth/react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    inquiries: 0,
    nextAppointment: null as string | null,
    favorites: 0,
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchStats()
    }
  }, [session])

  const fetchStats = async () => {
    try {
      // Fetch user stats
      const response = await fetch("/api/dashboard/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p>Wird geladen...</p>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            Willkommen, {session.user?.name || session.user?.email}!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Hier ist eine Übersicht Ihrer Aktivitäten
          </p>
        </div>
      </FadeIn>

      {/* Stats Cards */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <FadeIn delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Offene Anfragen</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.inquiries}</div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.2}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Nächster Termin</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.nextAppointment || "Keine"}
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeIn delay={0.3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Gespeicherte Fahrzeuge</CardTitle>
              <Heart className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.favorites}</div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      {/* Quick Actions */}
      <FadeIn delay={0.4}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href="/kontakt">
                  <MessageSquare className="h-6 w-6" />
                  <span>Neue Anfrage stellen</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href="/kontakt?type=service">
                  <Calendar className="h-6 w-6" />
                  <span>Termin buchen</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
                <Link href="/fahrzeuge">
                  <Car className="h-6 w-6" />
                  <span>Fahrzeuge durchsuchen</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Navigation Links */}
      <FadeIn delay={0.5}>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/inquiries">
                  <FileText className="mr-2 h-4 w-4" />
                  Meine Anfragen
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Favoriten
                </Link>
              </Button>
              <Button variant="ghost" className="justify-start" asChild>
                <Link href="/dashboard/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profil
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Abmelden
              </Button>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  )
}

