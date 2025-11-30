"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { FadeIn } from "@/components/animations/fade-in"
import { 
  Upload, 
  Settings, 
  RefreshCw, 
  Image as ImageIcon,
  Save,
  Loader2
} from "lucide-react"
import Image from "next/image"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [settings, setSettings] = useState<any>({})
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (session) {
      checkAdmin()
    }
  }, [status, session, router])

  const checkAdmin = async () => {
    try {
      const response = await fetch("/api/admin/check")
      if (response.ok) {
        const data = await response.json()
        setIsAdmin(data.isAdmin)
        if (!data.isAdmin) {
          router.push("/dashboard")
        }
      }
      setLoading(false)
    } catch (error) {
      console.error("Error checking admin:", error)
      setLoading(false)
    }
  }

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("/api/admin/gallery")
      if (response.ok) {
        const data = await response.json()
        setGalleryImages(data)
      }
    } catch (error) {
      console.error("Error fetching gallery:", error)
    }
  }

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        setSettings(data)
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    }
  }

  useEffect(() => {
    if (isAdmin) {
      fetchGalleryImages()
      fetchSettings()
    }
  }, [isAdmin])

  const handleSync = async () => {
    setSyncing(true)
    try {
      const response = await fetch("/api/vehicles/sync", {
        method: "POST",
      })
      const data = await response.json()
      if (data.success) {
        alert(`Sync erfolgreich! ${data.stats.created} erstellt, ${data.stats.updated} aktualisiert`)
      } else {
        alert(`Fehler: ${data.error}`)
      }
    } catch (error) {
      alert("Fehler beim Sync")
      console.error(error)
    } finally {
      setSyncing(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const formData = new FormData()
    Array.from(files).forEach((file) => {
      formData.append("images", file)
    })
    formData.append("category", "fahrzeuge")

    try {
      const response = await fetch("/api/admin/gallery/upload", {
        method: "POST",
        body: formData,
      })
      if (response.ok) {
        await fetchGalleryImages()
        alert("Bilder erfolgreich hochgeladen!")
      } else {
        alert("Fehler beim Hochladen")
      }
    } catch (error) {
      alert("Fehler beim Hochladen")
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  const handleSaveSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })
      if (response.ok) {
        alert("Einstellungen gespeichert!")
      } else {
        alert("Fehler beim Speichern")
      }
    } catch (error) {
      alert("Fehler beim Speichern")
      console.error(error)
    }
  }

  if (loading || status === "loading") {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4">Wird geladen...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <FadeIn>
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold">Admin-Bereich</h1>
          <p className="mt-2 text-muted-foreground">
            Verwalten Sie Fahrzeuge, Galerie und Einstellungen
          </p>
        </div>
      </FadeIn>

      <Tabs defaultValue="sync" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sync">AutoScout Sync</TabsTrigger>
          <TabsTrigger value="gallery">Galerie</TabsTrigger>
          <TabsTrigger value="settings">Einstellungen</TabsTrigger>
        </TabsList>

        <TabsContent value="sync">
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Fahrzeuge von AutoScout24 synchronisieren
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Klicken Sie auf den Button, um die Fahrzeuge von AutoScout24 manuell zu synchronisieren.
                  Dies aktualisiert alle Fahrzeuge in der Datenbank.
                </p>
                <Button 
                  onClick={handleSync} 
                  disabled={syncing}
                  className="w-full sm:w-auto"
                >
                  {syncing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Synchronisiere...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Jetzt synchronisieren
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </TabsContent>

        <TabsContent value="gallery">
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Galerie-Bilder verwalten
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="image-upload">Bilder hochladen</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="mt-2"
                  />
                  {uploading && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      <Loader2 className="inline h-4 w-4 animate-spin mr-2" />
                      Bilder werden hochgeladen...
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
                  {galleryImages.map((img) => (
                    <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border">
                      <Image
                        src={img.url}
                        alt={img.alt || "Gallery image"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </TabsContent>

        <TabsContent value="settings">
          <FadeIn>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Website-Einstellungen
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-title">Website-Titel</Label>
                  <Input
                    id="site-title"
                    value={settings.siteTitle || ""}
                    onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="site-description">Website-Beschreibung</Label>
                  <Textarea
                    id="site-description"
                    value={settings.siteDescription || ""}
                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="contact-email">Kontakt-E-Mail</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={settings.contactEmail || ""}
                    onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <Button onClick={handleSaveSettings} className="w-full sm:w-auto">
                  <Save className="mr-2 h-4 w-4" />
                  Einstellungen speichern
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </TabsContent>
      </Tabs>
    </div>
  )
}

