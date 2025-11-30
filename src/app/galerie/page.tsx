"use client"

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { FadeIn } from "@/components/animations/fade-in"

// Static image data
const images = [
  { id: 1, src: "/thumbnail_4CB3917A-517E-4423-B572-16104D8F10C3-1920w.webp", category: "fahrzeuge" },
  { id: 2, src: "/thumbnail_IMG_8106-1920w.webp", category: "fahrzeuge" },
  { id: 3, src: "/thumbnail_IMG_8387-1920w.webp", category: "fahrzeuge" },
  { id: 4, src: "/6ad93314-4d2b-4bcf-8a7d-c9d8b46141b9-1920w.webp", category: "werkstatt" },
  { id: 5, src: "/e45ecf29-f416-4525-bc56-b0035409414a-1920w.webp", category: "werkstatt" },
  { id: 6, src: "/e45ecf29-f416-4525-bc56-b0035409414a-1920w (1).webp", category: "team" },
]

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState("alle")

  const filteredImages =
    activeCategory === "alle"
      ? images
      : images.filter((img) => img.category === activeCategory)

  return (
    <div className="container mx-auto px-4 py-12">
      <FadeIn>
        <h1 className="mb-4 text-center text-4xl font-bold">Galerie</h1>
        <p className="mb-12 text-center text-xl text-muted-foreground">
          Eindrücke aus unserem Unternehmen
        </p>
      </FadeIn>

      <Tabs defaultValue="alle" onValueChange={setActiveCategory}>
        <TabsList className="mb-8 grid w-full grid-cols-4">
          <TabsTrigger value="alle">Alle</TabsTrigger>
          <TabsTrigger value="fahrzeuge">Fahrzeuge</TabsTrigger>
          <TabsTrigger value="werkstatt">Werkstatt</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value={activeCategory}>
          {filteredImages.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <p>Keine Bilder in dieser Kategorie vorhanden.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredImages.map((image, index) => (
                <FadeIn key={image.id} delay={index * 0.05}>
                  <div
                    className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <Image
                      src={image.src}
                      alt={`Galerie Bild ${image.id}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Lightbox */}
      <Dialog
        open={selectedImage !== null}
        onOpenChange={(open) => !open && setSelectedImage(null)}
      >
        <DialogContent
          className="max-w-4xl"
          onClose={() => setSelectedImage(null)}
        >
          {selectedImage && (
            <div className="relative aspect-video w-full">
              <Image
                src={selectedImage}
                alt="Galerie Bild"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

