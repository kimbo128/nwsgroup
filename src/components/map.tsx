"use client"

import { useEffect, useRef } from "react"
import { LOCATIONS } from "@/lib/constants"
import "leaflet/dist/leaflet.css"

// Fix for default marker icon in Next.js
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.Marker[]>([])

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!mapRef.current) return

      // Initialize map centered on Switzerland/Basel region
      const map = L.map(mapRef.current, {
        zoomControl: true,
        scrollWheelZoom: true,
      }).setView([47.5, 7.6], 11)

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

        const marker = L.marker([lat, lng], { icon: DefaultIcon })
          .addTo(map)
          .bindPopup(
            `<div style="min-width: 200px;">
              <strong>${location.name}</strong><br/>
              ${location.address}<br/>
              <a href="tel:${location.phone.replace(/\s/g, "")}">${location.phone}</a>
            </div>`
          )

        markersRef.current.push(marker)
      })

      // Fit map to show all markers
      if (markersRef.current.length > 0) {
        const group = new L.FeatureGroup(markersRef.current)
        map.fitBounds(group.getBounds().pad(0.1))
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
        markersRef.current = []
      }
    }
  }, [])

  return (
    <div 
      ref={mapRef} 
      className="h-full w-full rounded-lg"
      style={{ minHeight: "400px", zIndex: 0 }}
    />
  )
}

