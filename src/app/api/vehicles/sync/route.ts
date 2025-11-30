import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import * as cheerio from "cheerio"

// Force dynamic rendering to prevent build-time analysis
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

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
    // Try multiple selectors for robustness
    const selectors = [
      ".cldt-summary-full-item",
      "[data-item-name='cldt-summary-full-item']",
      ".cldt-summary-full-item-main",
      "article[data-vehicle-id]",
      ".cldt-summary-full-item-main article",
    ]

    let foundElements = $()
    for (const selector of selectors) {
      foundElements = $(selector)
      if (foundElements.length > 0) {
        console.log(`Found ${foundElements.length} vehicles using selector: ${selector}`)
        break
      }
    }

    // Fallback: try to find any article or listing element
    if (foundElements.length === 0) {
      foundElements = $("article, [data-vehicle-id], .listing-item, .vehicle-item")
      console.log(`Fallback: Found ${foundElements.length} potential vehicle elements`)
    }

    foundElements.each((index, element) => {
      try {
        const $el = $(element)

        // Extract vehicle ID from URL, data attribute, or generate one
        let autoscoutId = $el.attr("data-vehicle-id") || 
                         $el.attr("data-id") ||
                         $el.find("[data-vehicle-id]").attr("data-vehicle-id")
        
        const linkElement = $el.find("a[href*='/fahrzeuge/'], a[href*='/de/d/']").first()
        const href = linkElement.attr("href") || ""
        
        if (!autoscoutId && href) {
          const idMatch = href.match(/\/(\d+)/)
          autoscoutId = idMatch ? idMatch[1] : `vehicle-${index}-${Date.now()}`
        } else if (!autoscoutId) {
          autoscoutId = `vehicle-${index}-${Date.now()}`
        }

        const autoscoutUrl = href && href.startsWith("http")
          ? href
          : href
          ? `https://www.autoscout24.ch${href}`
          : `https://www.autoscout24.ch/de/d/${autoscoutId}`

        // Extract make and model - try multiple selectors
        const titleSelectors = [
          ".cldt-summary-title",
          "h2",
          "[data-vehicle-title]",
          ".vehicle-title",
          "a[href*='/fahrzeuge/']",
        ]
        let title = ""
        for (const sel of titleSelectors) {
          title = $el.find(sel).first().text().trim()
          if (title) break
        }
        
        if (!title) {
          title = $el.text().substring(0, 100).trim()
        }

        const titleParts = title.split(/\s+/)
        const make = titleParts[0] || "Unbekannt"
        const model = titleParts.slice(1).join(" ") || "Unbekannt"

        // Extract price - try multiple selectors
        const priceSelectors = [
          ".cldt-price",
          "[data-price]",
          ".price",
          ".vehicle-price",
        ]
        let priceText = ""
        for (const sel of priceSelectors) {
          priceText = $el.find(sel).first().text().trim()
          if (priceText) break
        }
        
        const price = priceText
          ? parseFloat(priceText.replace(/[^\d,.]/g, "").replace(",", ".")) || 0
          : 0

        // Extract year - try to find in various places
        const allText = $el.text()
        const yearMatch = allText.match(/\b(19|20)\d{2}\b/)
        const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear()

        // Extract mileage
        const mileageMatch = allText.match(/([\d.'\s]+)\s*km/i)
        const mileage = mileageMatch
          ? parseInt(mileageMatch[1].replace(/[.'\s]/g, ""))
          : 0

        // Extract fuel type
        let fuel = "Benzin"
        const fuelText = allText.toLowerCase()
        if (fuelText.includes("diesel")) fuel = "Diesel"
        else if (fuelText.includes("elektro") || fuelText.includes("electric")) fuel = "Elektro"
        else if (fuelText.includes("hybrid")) fuel = "Hybrid"
        else if (fuelText.includes("benzin") || fuelText.includes("petrol") || fuelText.includes("gasoline")) fuel = "Benzin"

        // Extract transmission
        let transmission = "Manuell"
        if (fuelText.includes("automatik") || fuelText.includes("automatic")) transmission = "Automatik"

        // Extract images - try multiple selectors
        const images: string[] = []
        const imageSelectors = [
          "img[src*='autoscout24'], img[data-src*='autoscout24']",
          "img",
          "[data-image-src]",
        ]
        
        for (const sel of imageSelectors) {
          $el.find(sel).each((_, img) => {
            const src = $(img).attr("src") || 
                       $(img).attr("data-src") || 
                       $(img).attr("data-image-src") ||
                       $(img).attr("data-lazy-src")
            if (src && !src.includes("placeholder") && !src.includes("logo") && !src.includes("icon")) {
              const fullUrl = src.startsWith("http") ? src : src.startsWith("//") ? `https:${src}` : `https://www.autoscout24.ch${src}`
              if (!images.includes(fullUrl)) {
                images.push(fullUrl)
              }
            }
          })
          if (images.length > 0) break
        }

        // Only add if we have minimum required data
        if (make && make !== "Unbekannt" && price > 0) {
          vehicles.push({
            autoscoutId,
            autoscoutUrl,
            make,
            model: model || "Unbekannt",
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
              status: "available",
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

