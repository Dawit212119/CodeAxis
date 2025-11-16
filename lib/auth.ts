import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface TokenPayload {
  userId: string
  email: string
  role: 'client' | 'freelancer' | 'student' | 'admin'
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload
  } catch (error) {
    return null
  }
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export async function getCurrentUser(): Promise<TokenPayload | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value
    
    if (!token) return null
    
    return verifyToken(token)
  } catch (error) {
    return null
  }
}

export function createAuthResponse(data: any, token: string) {
  const response = new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  })

  // Set HTTP-only cookie
  const cookieValue = `auth-token=${token}; HttpOnly; Secure=${process.env.NODE_ENV === 'production'}; Max-Age=${60 * 60 * 24 * 7}; Path=/`
  response.headers.set('Set-Cookie', cookieValue)

  return response
}