import * as jose from "jose"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here"

// Simple JWT token generation
export async function generateToken(userId: string): Promise<string> {
  const secret = new TextEncoder().encode(JWT_SECRET)
  return await new jose.SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret)
}

// Simple JWT token verification
export async function verifyToken(token: string): Promise<{ userId: string } | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET)
    const { payload } = await jose.jwtVerify(token, secret)
    return { userId: payload.userId as string }
  } catch (error) {
    return null
  } 
}

// Simple password hashing (for when you implement real auth)
export async function hashPassword(password: string): Promise<string> {
  // For now, return a simple hash - replace with bcrypt when implementing real auth
  return btoa(password + "salt")
}

// Simple password verification (for when you implement real auth)
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  // For now, simple comparison - replace with bcrypt when implementing real auth
  return btoa(password + "salt") === hashedPassword
}

// Utility function to get userId from request headers (set by middleware)
export function getUserIdFromHeaders(request: Request): string | null {
  const userId = request.headers.get('x-user-id')
  return userId
}


export const setAuthCookies = async (token: string) => {

  const cookiesStore = await cookies()
  cookiesStore.set('auth-token', token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7
  })

}
