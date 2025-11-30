import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") || "available"
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")

    const vehicles = await prisma.vehicle.findMany({
      where: {
        status: status === "all" ? undefined : status,
        featured: featured === "true" ? true : undefined,
      },
      take: limit ? parseInt(limit) : undefined,
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(vehicles)
  } catch (error) {
    console.error("Error fetching vehicles:", error)
    return NextResponse.json(
      { error: "Failed to fetch vehicles" },
      { status: 500 }
    )
  }
}

