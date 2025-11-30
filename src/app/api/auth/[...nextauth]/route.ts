import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

// @ts-expect-error - NextAuth v5 Beta type compatibility
export const GET = handler
// @ts-expect-error - NextAuth v5 Beta type compatibility
export const POST = handler

