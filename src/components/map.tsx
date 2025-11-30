"use client"

import { useEffect, useRef } from "react"
import { LOCATIONS } from "@/lib/constants"
import "leaflet/dist/leaflet.css"

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Dynamically import Leaflet only on client side
    import("leaflet").then((L) => {
      // Initialize map centered on Switzerland/Basel region
      const map = L.map(mapRef.current!).setView([47.5, 7.6], 11)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      mapInstanceRef.current = map

      // Add markers for each location
      LOCATIONS.forEach((location) => {
        const [lat, lng] = location.coordinates

        const marker = L.marker([lat, lng])
          .addTo(map)
          .bindPopup(
            `<div>
              <strong>${location.name}</strong><br/>
              ${location.address}<br/>
              <a href="tel:${location.phone.replace(/\s/g, "")}">${location.phone}</a>
            </div>`
          )

        markersRef.current.push(marker)
      })
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markersRef.current = []
      }
    }
  }, [])

  return <div ref={mapRef} className="h-full w-full" />
}

