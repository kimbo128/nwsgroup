import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id as string

    // Get user stats
    const [inquiries, favorites] = await Promise.all([
      prisma.inquiry.count({
        where: {
          userId,
          status: "open",
        },
      }),
      prisma.favorite.count({
        where: {
          userId,
        },
      }),
    ])

    return NextResponse.json({
      inquiries,
      nextAppointment: null, // TODO: Implement appointment system
      favorites,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}

