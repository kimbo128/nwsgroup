import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import puppeteer from "puppeteer-core"
import chromium from "@sparticuz/chromium"

// Force dynamic rendering to prevent build-time analysis
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Increase timeout for serverless function
export const maxDuration = 60

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

async function getBrowser() {
  // Check if running locally (development) or on server (production)
  const isLocal = process.env.NODE_ENV === 'development' || process.env.LOCAL_CHROME_PATH

  if (isLocal) {
    // Local development - use local Chrome
    const executablePath = process.env.LOCAL_CHROME_PATH || 
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    
    return puppeteer.launch({
      executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
  } else {
    // Production (Railway, Vercel, etc.) - use @sparticuz/chromium
    return puppeteer.launch({
      args: chromium.args,
      defaultViewport: { width: 1920, height: 1080 },
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    })
  }
}

async function fetchVehiclesFromAutoScout24(): Promise<VehicleData[]> {
  console.log(`Fetching from: ${AUTOSCOUT24_SELLER_URL}`)
  
  const browser = await getBrowser()
  
  try {
    const page = await browser.newPage()
    
    // Set a realistic viewport
    await page.setViewport({ width: 1920, height: 1080 })
    
    // Set user agent to look like a real browser
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    )
    
    // Set extra headers
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'de-CH,de;q=0.9,en;q=0.8',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    })

    // Navigate to the page
    console.log('Navigating to AutoScout24...')
    await page.goto(AUTOSCOUT24_SELLER_URL, { 
      waitUntil: 'networkidle2',
      timeout: 45000 
    })

    // Wait for content to load
    await page.waitForSelector('body', { timeout: 10000 })
    
    // Small delay to let JavaScript render
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Extract vehicle data from the page
    const vehicles = await page.evaluate(() => {
      const results: any[] = []
      
      // Try multiple selectors for vehicle listings
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
          console.log(`Found ${found.length} elements with selector: ${selector}`)
          break
        }
      }

      elements.forEach((el, index) => {
        try {
          // Get all text content for parsing
          const allText = el.textContent || ''
          
          // Find links to vehicle detail pages
          const links = el.querySelectorAll('a[href*="/d/"], a[href*="/fahrzeuge/"]')
          let href = ''
          let autoscoutId = ''
          
          links.forEach(link => {
            const linkHref = link.getAttribute('href') || ''
            if (linkHref.includes('/d/') || linkHref.includes('/fahrzeuge/')) {
              href = linkHref
              // Extract ID from URL
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

          // Extract title/make/model
          const titleEl = el.querySelector('h2, h3, [class*="title"], [class*="Title"]')
          const title = titleEl?.textContent?.trim() || ''
          const titleParts = title.split(/\s+/)
          const make = titleParts[0] || 'Unbekannt'
          const model = titleParts.slice(1).join(' ') || 'Unbekannt'

          // Extract price
          const priceEl = el.querySelector('[class*="price"], [class*="Price"], [data-testid*="price"]')
          let priceText = priceEl?.textContent || ''
          // Also try to find price in the text
          if (!priceText) {
            const priceMatch = allText.match(/CHF\s*([\d'.,\s]+)/)
            priceText = priceMatch ? priceMatch[1] : ''
          }
          const price = parseFloat(priceText.replace(/[^\d]/g, '')) || 0

          // Extract year
          const yearMatch = allText.match(/\b(19|20)\d{2}\b/)
          const year = yearMatch ? parseInt(yearMatch[0]) : new Date().getFullYear()

          // Extract mileage
          const mileageMatch = allText.match(/([\d'.\s]+)\s*km/i)
          const mileage = mileageMatch 
            ? parseInt(mileageMatch[1].replace(/['\s.]/g, '')) 
            : 0

          // Extract fuel type
          let fuel = 'Benzin'
          const fuelText = allText.toLowerCase()
          if (fuelText.includes('diesel')) fuel = 'Diesel'
          else if (fuelText.includes('elektro') || fuelText.includes('electric')) fuel = 'Elektro'
          else if (fuelText.includes('hybrid')) fuel = 'Hybrid'

          // Extract transmission
          let transmission = 'Manuell'
          if (fuelText.includes('automatik') || fuelText.includes('automatic') || fuelText.includes('automat')) {
            transmission = 'Automatik'
          }

          // Extract images
          const images: string[] = []
          el.querySelectorAll('img').forEach(img => {
            const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-lazy-src')
            if (src && !src.includes('placeholder') && !src.includes('logo') && !src.includes('icon') && src.includes('http')) {
              if (!images.includes(src)) {
                images.push(src)
              }
            }
          })

          // Only add if we have minimum required data
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
    
    // If no vehicles found, try to get page content for debugging
    if (vehicles.length === 0) {
      const pageContent = await page.content()
      console.log('Page content length:', pageContent.length)
      
      // Check if we're blocked or on wrong page
      if (pageContent.includes('blocked') || pageContent.includes('captcha')) {
        throw new Error('Page appears to be blocked or requires captcha')
      }
    }

    return vehicles
  } finally {
    await browser.close()
  }
}

export async function POST(request: Request) {
  try {
    console.log("Starting vehicle sync from AutoScout24 with Puppeteer...")
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
