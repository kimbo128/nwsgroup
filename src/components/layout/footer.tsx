import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12">
        <div className="flex flex-col items-center justify-center text-center">
          <Image
            src="/logo.png"
            alt="NWS Group AG"
            width={120}
            height={120}
            className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-contain mb-4"
          />
          <span className="font-semibold text-lg sm:text-xl md:text-2xl">NWS Group AG</span>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 border-t pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2025 NWS Group AG - Alle Rechte vorbehalten</p>
        </div>
      </div>
    </footer>
  )
}

