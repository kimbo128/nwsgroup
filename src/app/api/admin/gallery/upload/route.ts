import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id as string },
      select: { role: true },
    })

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const formData = await request.formData()
    const files = formData.getAll("images")
    const category = (formData.get("category") as string) || "fahrzeuge"

    // For now, we'll store URLs. In production, upload to cloud storage (S3, R2, etc.)
    const uploadedImages = []

    for (const fileEntry of files) {
      // Type guard: check if it's a File-like object
      if (
        typeof fileEntry !== "object" ||
        fileEntry === null ||
        typeof (fileEntry as any).arrayBuffer !== "function" ||
        typeof (fileEntry as any).name !== "string" ||
        typeof (fileEntry as any).type !== "string"
      ) {
        continue
      }
      
      const file = fileEntry as { arrayBuffer: () => Promise<ArrayBuffer>; name: string; type: string }
      // Convert to base64 or upload to storage service
      // This is a simplified version - in production, use proper file storage
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const base64 = buffer.toString("base64")
      const dataUrl = `data:${file.type};base64,${base64}`

      const image = await prisma.galleryImage.create({
        data: {
          url: dataUrl,
          category,
          alt: file.name,
        },
      })

      uploadedImages.push(image)
    }

    return NextResponse.json({
      success: true,
      images: uploadedImages,
    })
  } catch (error) {
    console.error("Error uploading images:", error)
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    )
  }
}

