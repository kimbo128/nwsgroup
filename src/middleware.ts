import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Protect dashboard routes
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*"],
}

