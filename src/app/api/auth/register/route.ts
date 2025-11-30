import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, password } = body

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "E-Mail, Passwort und Name sind erforderlich" },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Passwort muss mindestens 8 Zeichen lang sein" },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "E-Mail bereits registriert" },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone: phone || null,
        password: hashedPassword,
        role: "user", // Default role
      },
    })

    return NextResponse.json({
      success: true,
      message: "Registrierung erfolgreich",
      userId: user.id,
    })
  } catch (error) {
    console.error("Registration error:", error)
    
    // More detailed error messages
    if (error instanceof Error) {
      // Prisma unique constraint error
      if (error.message.includes("Unique constraint")) {
        return NextResponse.json(
          { error: "E-Mail bereits registriert" },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        { error: `Fehler bei der Registrierung: ${error.message}` },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      { error: "Fehler bei der Registrierung. Bitte versuchen Sie es erneut." },
      { status: 500 }
    )
  }
}

