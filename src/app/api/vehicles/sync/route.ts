import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import * as cheerio from "cheerio"

const AUTOSCOUT24_SELLER_URL =
  process.env.AUTOSCOUT24_SELLER_URL ||
  "https://www.autoscout24.ch/de/s/seller-2328369"

interface VehicleData {
  autoscoutId: string
  autoscoutUrl: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuel: string
  transmission: string
  color?: string
  description?: string
  images: string[]
}

async function fetchVehiclesFromAutoScout24(): Promise<VehicleData[]> {
  try {
    const response = await fetch(AUTOSCOUT24_SELLER_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const html = await response.text()
    const $ = cheerio.load(html)

    const vehicles: VehicleData[] = []

    // Parse vehicle listings from AutoScout24 HTML
    // Note: This is a simplified parser - adjust based on actual HTML structure
    $(".cldt-summary-full-item").each((index, element) => {
      try {
        const $el = $(element)

        // Extract vehicle ID from URL or data attribute
        const linkElement = $el.find("a").first()
        const href = linkElement.attr("href") || ""
        const autoscoutId =
          href.match(/\/(\d+)/)?.[1] || `vehicle-${index}-${Date.now()}`
        const autoscoutUrl = href.startsWith("http")
          ? href
          : `https://www.autoscout24.ch${href}`

        // Extract make and model
        const title = $el.find(".cldt-summary-title").text().trim()
        const [make, ...modelParts] = title.split(" ")
        const model = modelParts.join(" ")

        // Extract price
        const priceText = $el.find(".cldt-price").text().trim()
        const price = parseFloat(
          priceText.replace(/[^\d,.]/g, "").replace(",", ".")
        ) || 0

        // Extract year
        const yearText = $el.find(".cldt-summary-vehicle-data").first().text()
        const yearMatch = yearText.match(/(\d{4})/)
        const year = yearMatch ? parseInt(yearMatch[1]) : new Date().getFullYear()

        // Extract mileage
        const mileageText = $el
          .find(".cldt-summary-vehicle-data")
          .eq(1)
          .text()
        const mileageMatch = mileageText.match(/([\d.]+)\s*km/i)
        const mileage = mileageMatch
          ? parseInt(mileageMatch[1].replace(/\./g, ""))
          : 0

        // Extract fuel type
        const fuelText = $el.find(".cldt-summary-vehicle-data").text()
        let fuel = "Benzin"
        if (fuelText.includes("Diesel")) fuel = "Diesel"
        else if (fuelText.includes("Elektro")) fuel = "Elektro"
        else if (fuelText.includes("Hybrid")) fuel = "Hybrid"

        // Extract transmission
        let transmission = "Manuell"
        if (fuelText.includes("Automatik")) transmission = "Automatik"

        // Extract images
        const images: string[] = []
        $el.find("img").each((_, img) => {
          const src = $(img).attr("src") || $(img).attr("data-src")
          if (src && !src.includes("placeholder")) {
            images.push(src.startsWith("http") ? src : `https:${src}`)
          }
        })

        if (make && model && price > 0) {
          vehicles.push({
            autoscoutId,
            autoscoutUrl,
            make,
            model,
            year,
            price,
            mileage,
            fuel,
            transmission,
            images: images.slice(0, 10), // Limit to 10 images
          })
        }
      } catch (error) {
        console.error(`Error parsing vehicle ${index}:`, error)
      }
    })

    return vehicles
  } catch (error) {
    console.error("Error fetching vehicles from AutoScout24:", error)
    throw error
  }
}

export async function POST(request: Request) {
  try {
    // Optional: Add authentication/authorization check here
    // const authHeader = request.headers.get("authorization")
    // if (authHeader !== `Bearer ${process.env.SYNC_SECRET}`) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    console.log("Starting vehicle sync from AutoScout24...")

    const vehicles = await fetchVehiclesFromAutoScout24()
    console.log(`Fetched ${vehicles.length} vehicles from AutoScout24`)

    // Get all current vehicle IDs from database
    const existingVehicles = await prisma.vehicle.findMany({
      select: { autoscoutId: true },
    })
    const existingIds = new Set(existingVehicles.map((v) => v.autoscoutId))
    const fetchedIds = new Set(vehicles.map((v) => v.autoscoutId))

    // Mark vehicles as sold if they're no longer in the fetched list
    const soldIds = Array.from(existingIds).filter((id) => !fetchedIds.has(id))
    if (soldIds.length > 0) {
      await prisma.vehicle.updateMany({
        where: {
          autoscoutId: { in: soldIds },
          status: { not: "sold" },
        },
        data: {
          status: "sold",
        },
      })
      console.log(`Marked ${soldIds.length} vehicles as sold`)
    }

    // Upsert vehicles
    let created = 0
    let updated = 0

    for (const vehicle of vehicles) {
      try {
        const existing = await prisma.vehicle.findUnique({
          where: { autoscoutId: vehicle.autoscoutId },
        })

        if (existing) {
          await prisma.vehicle.update({
            where: { autoscoutId: vehicle.autoscoutId },
            data: {
              ...vehicle,
              lastSynced: new Date(),
              status: vehicle.status || "available",
            },
          })
          updated++
        } else {
          await prisma.vehicle.create({
            data: {
              ...vehicle,
              lastSynced: new Date(),
              status: "available",
            },
          })
          created++
        }
      } catch (error) {
        console.error(
          `Error upserting vehicle ${vehicle.autoscoutId}:`,
          error
        )
      }
    }

    return NextResponse.json({
      success: true,
      message: "Sync completed",
      stats: {
        fetched: vehicles.length,
        created,
        updated,
        markedAsSold: soldIds.length,
      },
    })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

// GET endpoint for manual trigger (optional)
export async function GET() {
  return NextResponse.json({
    message: "Use POST to trigger sync",
    endpoint: "/api/vehicles/sync",
  })
}

