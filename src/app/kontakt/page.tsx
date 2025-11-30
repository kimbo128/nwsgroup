"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FadeIn } from "@/components/animations/fade-in"
import { LOCATIONS, WHATSAPP_GENERAL, TELEGRAM_BOT_URL } from "@/lib/constants"
import { MapPin, Phone, Mail, MessageCircle, Send } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("@/components/map"), { ssr: false })

const contactSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Ungültige E-Mail-Adresse"),
  phone: z.string().min(10, "Ungültige Telefonnummer"),
  subject: z.enum(["buy", "sell", "service", "other"], {
    required_error: "Bitte wählen Sie einen Betreff",
  }),
  message: z.string().min(10, "Nachricht muss mindestens 10 Zeichen lang sein"),
  privacy: z.boolean().refine((val) => val === true, {
    message: "Sie müssen der Datenschutzerklärung zustimmen",
  }),
})

type ContactFormData = z.infer<typeof contactSchema>

function KontaktPageContent() {
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: (searchParams.get("type") as any) || "other",
      privacy: false,
    },
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Fehler beim Senden der Nachricht")
      }

      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Ein Fehler ist aufgetreten"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="mb-4 text-center text-4xl font-bold">Kontakt</h1>
        <p className="mb-12 text-center text-xl text-muted-foreground">
          Wir freuen uns auf Ihre Nachricht
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Contact Form */}
        <FadeIn>
          <Card>
            <CardHeader>
              <CardTitle>Nachricht senden</CardTitle>
            </CardHeader>
            <CardContent>
              {submitSuccess ? (
                <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <p className="font-semibold">Nachricht erfolgreich gesendet!</p>
                  <p className="text-sm">
                    Wir werden uns so schnell wie möglich bei Ihnen melden.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <FormField>
                    <FormItem>
                      <FormLabel htmlFor="name">Name *</FormLabel>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder="Ihr Name"
                      />
                      <FormMessage name="name" />
                    </FormItem>
                  </FormField>

                  <FormField>
                    <FormItem>
                      <FormLabel htmlFor="email">E-Mail *</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="ihre.email@example.com"
                      />
                      <FormMessage name="email" />
                    </FormItem>
                  </FormField>

                  <FormField>
                    <FormItem>
                      <FormLabel htmlFor="phone">Telefon *</FormLabel>
                      <Input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        placeholder="+41 XX XXX XX XX"
                      />
                      <FormMessage name="phone" />
                    </FormItem>
                  </FormField>

                  <FormField>
                    <FormItem>
                      <FormLabel htmlFor="subject">Betreff *</FormLabel>
                      <Select
                        id="subject"
                        {...register("subject")}
                        onChange={(e) => setValue("subject", e.target.value as any)}
                      >
                        <option value="buy">Fahrzeug kaufen</option>
                        <option value="sell">Fahrzeug verkaufen</option>
                        <option value="service">Karosseriearbeit</option>
                        <option value="other">Sonstiges</option>
                      </Select>
                      <FormMessage name="subject" />
                    </FormItem>
                  </FormField>

                  <FormField>
                    <FormItem>
                      <FormLabel htmlFor="message">Nachricht *</FormLabel>
                      <Textarea
                        id="message"
                        {...register("message")}
                        placeholder="Ihre Nachricht..."
                        rows={6}
                      />
                      <FormMessage name="message" />
                    </FormItem>
                  </FormField>

                  <FormField>
                    <FormItem className="flex items-start gap-2">
                      <Checkbox
                        id="privacy"
                        {...register("privacy")}
                        onCheckedChange={(checked) =>
                          setValue("privacy", checked === true)
                        }
                      />
                      <div className="space-y-1">
                        <FormLabel
                          htmlFor="privacy"
                          className="cursor-pointer text-sm font-normal"
                        >
                          Ich stimme der{" "}
                          <a
                            href="/datenschutz"
                            className="text-primary hover:underline"
                          >
                            Datenschutzerklärung
                          </a>{" "}
                          zu *
                        </FormLabel>
                        <FormMessage name="privacy" />
                      </div>
                    </FormItem>
                  </FormField>

                  {submitError && (
                    <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                      {submitError}
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Wird gesendet..." : "Nachricht senden"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </FadeIn>

        {/* Contact Info */}
        <FadeIn delay={0.2}>
          <div className="space-y-6">
            {/* Map Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Unsere Standorte</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full overflow-hidden rounded-lg">
                  <Map />
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            {LOCATIONS.map((location) => (
              <Card key={location.name}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{location.address}</p>
                  <a
                    href={`tel:${location.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    {location.phone}
                  </a>
                  <a
                    href={`mailto:${location.email}`}
                    className="flex items-center gap-2 text-sm hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    {location.email}
                  </a>
                </CardContent>
              </Card>
            ))}

            {/* Direct Contact Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Direktkontakt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {LOCATIONS.map((location) => (
                  <Button
                    key={`phone-${location.name}`}
                    variant="outline"
                    className="w-full justify-start"
                    asChild
                  >
                    <a href={`tel:${location.phone.replace(/\s/g, "")}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      {location.name}: {location.phone}
                    </a>
                  </Button>
                ))}
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a
                    href={`https://wa.me/${WHATSAPP_GENERAL.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp Chat
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  asChild
                >
                  <a href={TELEGRAM_BOT_URL} target="_blank" rel="noopener noreferrer">
                    <Send className="mr-2 h-4 w-4" />
                    Telegram Bot
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </FadeIn>
      </div>
    </div>
  )
}

export default function KontaktPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">Wird geladen...</div>
      </div>
    }>
      <KontaktPageContent />
    </Suspense>
  )
}

