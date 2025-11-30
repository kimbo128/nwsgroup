import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Validate environment variables at runtime
if (!process.env.NEXTAUTH_SECRET) {
  throw new Error(
    "NEXTAUTH_SECRET is missing. Please set it in Railway Environment Variables."
  )
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

