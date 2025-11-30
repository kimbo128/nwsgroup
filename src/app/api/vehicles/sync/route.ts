import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// Force dynamic rendering to prevent build-time analysis
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Increase timeout for serverless function
export const maxDuration = 60

// AutoScout24 HCI JSON Schnittstelle (offizielle API)
// Für Seller 2328369 - muss beim AutoScout24 Support aktiviert werden
const AUTOSCOUT24_HCI_API_URL = 
  process.env.AUTOSCOUT24_HCI_API_URL ||
  `https://www.autoscout24.ch/hci/feed/json/seller/2328369`

// Fallback: Seller URL für Puppeteer (falls API nicht verfügbar)
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

/**
 * Offizielle Methode: HCI JSON Schnittstelle
 * Diese API muss beim AutoScout24 Support aktiviert werden
 * Kontakt: support@autoscout24.ch
 */
async function fetchVehiclesFromHCIAPI(): Promise<VehicleData[]> {
  try {
    console.log(`Fetching from HCI API: ${AUTOSCOUT24_HCI_API_URL}`)
    
    const response = await fetch(AUTOSCOUT24_HCI_API_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; NWSGroup/1.0)',
        'Accept': 'application/json',
      },
      next: { revalidate: 0 }, // Always fetch fresh data
    })

    if (!response.ok) {
      throw new Error(`HCI API returned ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    
    // HCI JSON Format variiert - anpassen je nach tatsächlichem Format
    // Typisches Format: { vehicles: [...] } oder direkt Array
    const vehiclesArray = Array.isArray(data) ? data : (data.vehicles || data.items || [])
    
    const vehicles: VehicleData[] = vehiclesArray.map((vehicle: any) => {
      // Mapping je nach tatsächlichem HCI JSON Format
      return {
        autoscoutId: vehicle.id?.toString() || vehicle.vehicleId?.toString() || `vehicle-${Date.now()}`,
        autoscoutUrl: vehicle.url || vehicle.link || `https://www.autoscout24.ch/de/d/${vehicle.id}`,
        make: vehicle.make || vehicle.brand || vehicle.manufacturer || 'Unbekannt',
        model: vehicle.model || vehicle.modelName || 'Unbekannt',
        year: vehicle.year || vehicle.constructionYear || new Date().getFullYear(),
        price: vehicle.price || vehicle.priceAmount || vehicle.priceValue || 0,
        mileage: vehicle.mileage || vehicle.km || vehicle.odometer || 0,
        fuel: vehicle.fuel || vehicle.fuelType || vehicle.energyType || 'Benzin',
        transmission: vehicle.transmission || vehicle.gearbox || vehicle.gearType || 'Manuell',
        color: vehicle.color || vehicle.exteriorColor,
        description: vehicle.description || vehicle.notes,
        images: Array.isArray(vehicle.images) 
          ? vehicle.images.map((img: any) => typeof img === 'string' ? img : img.url || img.src)
          : vehicle.image ? [vehicle.image] : [],
      }
    })

    console.log(`Fetched ${vehicles.length} vehicles from HCI API`)
    return vehicles
  } catch (error) {
    console.error("HCI API Error:", error)
    throw error
  }
}

/**
 * Fallback: Puppeteer Web Scraping (falls HCI API nicht verfügbar)
 * WARNUNG: Kann gegen AutoScout24 Nutzungsbedingungen verstoßen!
 */
async function fetchVehiclesWithPuppeteer(): Promise<VehicleData[]> {
  // Dynamischer Import um Build-Probleme zu vermeiden
  const puppeteer = (await import("puppeteer-core")).default
  const chromium = await import("@sparticuz/chromium")
  
  console.log(`Fetching from: ${AUTOSCOUT24_SELLER_URL} (Puppeteer Fallback)`)
  
  const isLocal = process.env.NODE_ENV === 'development' || process.env.LOCAL_CHROME_PATH
  
  let browser
  if (isLocal) {
    const executablePath = process.env.LOCAL_CHROME_PATH || 
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    browser = await puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  } else {
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: await chromium.executablePath(),
      headless: true,
    })
  }
  
  try {
    const page = await browser.newPage()
    await page.setViewport({ width: 1920, height: 1080 })
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    })

    await page.goto(AUTOSCOUT24_SELLER_URL, { 
      waitUntil: 'networkidle2',
      timeout: 45000 
    })
    await page.waitForSelector('body', { timeout: 10000 })
    await new Promise(resolve => setTimeout(resolve, 2000))

    const vehicles = await page.evaluate(() => {
      const results: any[] = []
      const selectors = [
        'article[data-testid]',
        '[data-testid="listing-card"]',
        '.cldt-summary-full-item',
        'article',
        '[class*="ListItem"]',
        '[class*="listing"]',
      ]
      
      let elements: Element[] = []
      for (const selector of selectors) {
        const found = document.querySelectorAll(selector)
        if (found.length > 0) {
          elements = Array.from(found)
          break
        }
      }

      elements.forEach((el, index) => {
        try {
          const allText = el.textContent || ''
          const links = el.querySelectorAll('a[href*="/d/"], a[href*="/fahrzeuge/"]')
          let href = ''
          let autoscoutId = ''
          
          links.forEach(link => {
            const linkHref = link.getAttribute('href') || ''
            if (linkHref.includes('/d/') || linkHref.includes('/fahrzeuge/')) {
              href = linkHref
              const idMatch = linkHref.match(/\/d\/([^/?]+)/) || linkHref.match(/\/(\d+)/)
              if (idMatch) {
                autoscoutId = idMatch[1]
              }
            }
          })
          
          if (!autoscoutId) {
            autoscoutId = `vehicle-${index}-${Date.now()}`
          }
          
          const autoscoutUrl = href.startsWith('http') 
            ? href 
            : href 
              ? `https://www.autoscout24.ch${href}` 
              : `https://www.autoscout24.ch/de/d/${autoscoutId}`

          const titleEl = el.querySelector('h2, h3, [class*="title"], [class*="Title"]')
          const title = titleEl?.textContent?.trim() || ''
          const titleParts = title.split(/\s+/)
          const make = titleParts[0] || 'Unbekannt'
          const model = titleParts.slice(1).join(' ') || 'Unbekannt'

          const priceEl = el.querySelector('[class*="price"], [class*="Price"], [data-testid*="price"]')
          let priceText = priceEl?.textContent || ''
          if (!priceText) {
            const priceMatch = allText.match(/CHF\s*([\d'.,\s]+)/)
            priceText = priceMatch ? priceMatch[1] : ''
          }
          const price = parseFloat(priceText.replace(/[^\d]/g, '')) || 0

          const yearMatch = allText.match(/\b(19|20)\d{2}\b/)
          const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear()

          const mileageMatch = allText.match(/([\d'.\s]+)\s*km/i)
          const mileage = mileageMatch 
            ? parseInt(mileageMatch[1].replace(/['\s.]/g, '')) 
            : 0

          let fuel = 'Benzin'
          const fuelText = allText.toLowerCase()
          if (fuelText.includes('diesel')) fuel = 'Diesel'
          else if (fuelText.includes('elektro') || fuelText.includes('electric')) fuel = 'Elektro'
          else if (fuelText.includes('hybrid')) fuel = 'Hybrid'

          let transmission = 'Manuell'
          if (fuelText.includes('automatik') || fuelText.includes('automatic') || fuelText.includes('automat')) {
            transmission = 'Automatik'
          }

          const images: string[] = []
          el.querySelectorAll('img').forEach(img => {
            const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src')
            if (src && !src.includes('placeholder') && !src.includes('logo') && !src.includes('icon') && src.includes('http')) {
              if (!images.includes(src)) {
                images.push(src)
              }
            }
          })

          if (make && make !== 'Unbekannt' && price > 0) {
            results.push({
              autoscoutId,
              autoscoutUrl,
              make,
              model: model || 'Unbekannt',
              year,
              price,
              mileage,
              fuel,
              transmission,
              images: images.slice(0, 10),
            })
          }
        } catch (err) {
          console.error('Error parsing element:', err)
        }
      })

      return results
    })

    console.log(`Extracted ${vehicles.length} vehicles from page`)
    return vehicles
  } finally {
    await browser.close()
  }
}

/**
 * Hauptfunktion: Versucht zuerst HCI API, dann Puppeteer Fallback
 */
async function fetchVehiclesFromAutoScout24(): Promise<VehicleData[]> {
  // Versuche zuerst die offizielle HCI API
  if (process.env.AUTOSCOUT24_USE_HCI_API !== 'false') {
    try {
      return await fetchVehiclesFromHCIAPI()
    } catch (hciError) {
      console.warn("HCI API failed, falling back to Puppeteer:", hciError)
      // Fallback zu Puppeteer nur wenn explizit erlaubt
      if (process.env.AUTOSCOUT24_ALLOW_PUPPETEER === 'true') {
        return await fetchVehiclesWithPuppeteer()
      }
      throw new Error(`HCI API nicht verfügbar. Bitte kontaktieren Sie AutoScout24 Support (support@autoscout24.ch) für API-Zugang. Fehler: ${hciError instanceof Error ? hciError.message : 'Unknown'}`)
    }
  }
  
  // Fallback zu Puppeteer (nur wenn explizit aktiviert)
  if (process.env.AUTOSCOUT24_ALLOW_PUPPETEER === 'true') {
    return await fetchVehiclesWithPuppeteer()
  }
  
  throw new Error("Keine Sync-Methode aktiviert. Bitte HCI API aktivieren oder Puppeteer explizit erlauben.")
}

export async function POST(request: Request) {
  try {
    console.log("Starting vehicle sync from AutoScout24...")
    console.log(`Using URL: ${AUTOSCOUT24_SELLER_URL}`)

    let vehicles: VehicleData[]
    try {
      vehicles = await fetchVehiclesFromAutoScout24()
      console.log(`Fetched ${vehicles.length} vehicles from AutoScout24`)
    } catch (fetchError) {
      console.error("Error fetching vehicles:", fetchError)
      return NextResponse.json(
        {
          success: false,
          error: `Failed to fetch vehicles: ${fetchError instanceof Error ? fetchError.message : "Unknown error"}`,
          hint: "Für die offizielle HCI API kontaktieren Sie: support@autoscout24.ch",
        },
        { status: 500 }
      )
    }

    // Get all current vehicle IDs from database
    let existingVehicles
    try {
      existingVehicles = await prisma.vehicle.findMany({
        select: { autoscoutId: true },
      })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        {
          success: false,
          error: `Database error: ${dbError instanceof Error ? dbError.message : "Unknown error"}`,
        },
        { status: 500 }
      )
    }

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
      method: process.env.AUTOSCOUT24_USE_HCI_API !== 'false' ? 'HCI API' : 'Puppeteer',
      stats: {
        fetched: vehicles.length,
        created,
        updated,
        markedAsSold: soldIds.length,
      },
    })
  } catch (error) {
    console.error("Sync error:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorStack = error instanceof Error ? error.stack : undefined
    
    console.error("Error details:", {
      message: errorMessage,
      stack: errorStack,
      name: error instanceof Error ? error.name : undefined,
    })
    
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: process.env.NODE_ENV === "development" ? errorStack : undefined,
        hint: "Für die offizielle HCI API kontaktieren Sie: support@autoscout24.ch",
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
    officialMethod: "HCI JSON Schnittstelle - Kontakt: support@autoscout24.ch",
    currentMethod: process.env.AUTOSCOUT24_USE_HCI_API !== 'false' ? 'HCI API (offiziell)' : 'Puppeteer (Fallback)',
  })
}
