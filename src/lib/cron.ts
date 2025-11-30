/**
 * Cron Job für AutoScout24 Sync
 * 
 * Diese Datei kann für Railway Cron Jobs oder N8N Workflows verwendet werden.
 * 
 * Railway Cron Setup:
 * 1. Erstelle eine neue Service mit diesem Command:
 *    node -e "require('./src/lib/cron').syncVehicles()"
 * 2. Setze Schedule: 0 2 * * * (täglich um 02:00 Uhr)
 * 
 * Oder verwende N8N Webhook:
 * - Erstelle einen täglichen Cron Trigger
 * - Sende POST Request zu: https://your-domain.com/api/vehicles/sync
 */

export async function syncVehicles() {
  try {
    const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000"
    const syncUrl = `${baseUrl}/api/vehicles/sync`

    console.log(`Starting AutoScout24 sync at ${new Date().toISOString()}`)

    const response = await fetch(syncUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Optional: Add authorization header
        // Authorization: `Bearer ${process.env.SYNC_SECRET}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Sync completed:", data)

    return data
  } catch (error) {
    console.error("Sync error:", error)
    throw error
  }
}

// Wenn direkt ausgeführt (für Testing)
if (require.main === module) {
  syncVehicles()
    .then(() => {
      console.log("Sync completed successfully")
      process.exit(0)
    })
    .catch((error) => {
      console.error("Sync failed:", error)
      process.exit(1)
    })
}

