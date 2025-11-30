import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.enum(["buy", "sell", "service", "other"]),
  message: z.string().min(10),
  privacy: z.boolean().refine((val) => val === true),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Save to database (if user is logged in, associate with user)
    // For now, we'll just log it and return success
    // Later: integrate with N8N webhook

    console.log("New contact inquiry:", {
      name: data.name,
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message,
      timestamp: new Date().toISOString(),
    })

    // TODO: Send to N8N webhook
    // if (process.env.N8N_WEBHOOK_URL) {
    //   await fetch(process.env.N8N_WEBHOOK_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(data),
    //   })
    // }

    return NextResponse.json({ success: true, message: "Nachricht erfolgreich gesendet" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Ungültige Eingaben", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Fehler beim Senden der Nachricht" },
      { status: 500 }
    )
  }
}

