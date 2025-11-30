import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { prisma } from "@/lib/db"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request })
    
    if (!token?.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = token.sub

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

