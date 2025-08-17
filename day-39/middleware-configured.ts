// the middleware is configured for the platform build for the blogs 
// configured the protected routes - public routes - api routes 

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/auth"

const ROUTES = {
  public: {
    pages: ["/", "/login", "/signup", "/blog"],
    apis: ["/api/auth", "/api/blog"]
  },
  
  protected: {
    pages: ["/feed", "/create", "/profile", "/settings"],
    apis: ["/api/profile", "/api/articles", "/api/users", "/api/settings"]
  }
}

function isRoute(pathname: string, routes: string[]): boolean {
  return routes.some(route => pathname.startsWith(route))
}

function isPublicRoute(pathname: string): boolean {
  return isRoute(pathname, ROUTES.public.pages) || isRoute(pathname, ROUTES.public.apis)
}

function isProtectedRoute(pathname: string): boolean {
  return isRoute(pathname, ROUTES.protected.pages) || isRoute(pathname, ROUTES.protected.apis)
}

function isAPIRoute(pathname: string): boolean {
  return pathname.startsWith("/api/")
}

function isPageRoute(pathname: string): boolean {
  return !isAPIRoute(pathname)
}

async function handleProtectedAPI(request: NextRequest, token: string) {
  const decoded = await verifyToken(token)
  if (!decoded) {
    return new NextResponse(
      JSON.stringify({ error: "Invalid token" }), 
      { status: 401, headers: { "Content-Type": "application/json" } }
    )
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', decoded.userId)
  
  return NextResponse.next({ request: { headers: requestHeaders } })
}

async function handleProtectedPage(request: NextRequest, token: string) {
  const decoded = await verifyToken(token)
  if (!decoded) {
    // Clear invalid token and redirect
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete("auth-token")
    return response
  }
  
  return NextResponse.next()
}

async function handlePublicRoute(request: NextRequest, pathname: string, token: string) {
  if (token && (pathname === "/login" || pathname === "/signup")) {
    const decoded = await verifyToken(token)
    if (decoded) {
      return NextResponse.redirect(new URL("/feed", request.url))
    }
  }
  
  return NextResponse.next()
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get("auth-token")?.value

  if (pathname.includes(".") || pathname.startsWith("/_next/")) {
    return NextResponse.next()
  }

  if (isProtectedRoute(pathname)) {
    if (!token) {
      if (isAPIRoute(pathname)) {
        return new NextResponse(
          JSON.stringify({ error: "Unauthorized" }), 
          { status: 401, headers: { "Content-Type": "application/json" } }
        )
      }
      return NextResponse.redirect(new URL("/login", request.url))
    }
    
    return isAPIRoute(pathname) 
      ? await handleProtectedAPI(request, token)
      : await handleProtectedPage(request, token)
  }

  if (isPublicRoute(pathname)) {
    return await handlePublicRoute(request, pathname, token || "")
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/api/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}