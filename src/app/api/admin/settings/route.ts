import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true },
    })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const settings = await prisma.setting.findMany()
    const settingsObj: Record<string, any> = {}

    settings.forEach((setting) => {
      if (setting.type === "number") {
        settingsObj[setting.key] = Number(setting.value)
      } else if (setting.type === "boolean") {
        settingsObj[setting.key] = setting.value === "true"
      } else if (setting.type === "json") {
        settingsObj[setting.key] = JSON.parse(setting.value)
      } else {
        settingsObj[setting.key] = setting.value
      }
    })

    return NextResponse.json(settingsObj)
  } catch (error) {
    console.error("Error fetching settings:", error)
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true },
    })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const body = await request.json()

    for (const [key, value] of Object.entries(body)) {
      const stringValue = typeof value === "object" 
        ? JSON.stringify(value) 
        : String(value)
      
      const type = typeof value === "number" 
        ? "number" 
        : typeof value === "boolean" 
        ? "boolean" 
        : typeof value === "object" 
        ? "json" 
        : "string"

      await prisma.setting.upsert({
        where: { key },
        update: {
          value: stringValue,
          type,
          updatedBy: session.user.id as string,
        },
        create: {
          key,
          value: stringValue,
          type,
          updatedBy: session.user.id as string,
        },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving settings:", error)
    return NextResponse.json(
      { error: "Failed to save settings" },
      { status: 500 }
    )
  }
}

