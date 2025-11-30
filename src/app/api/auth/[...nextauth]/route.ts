import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Lazy handler creation - validation happens at runtime, not build time
const getHandler = () => {
  // Validate at runtime only
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
    throw new Error(
      "NEXTAUTH_SECRET is missing. Please set it in Railway Environment Variables."
    )
  }
  return NextAuth(authOptions)
}

const handler = getHandler()

export { handler as GET, handler as POST }

