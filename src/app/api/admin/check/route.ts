import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ isAdmin: false }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true },
    })

    return NextResponse.json({
      isAdmin: user?.role === "admin",
    })
  } catch (error) {
    console.error("Error checking admin:", error)
    return NextResponse.json(
      { error: "Failed to check admin status" },
      { status: 500 }
    )
  }
}



