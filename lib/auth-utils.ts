'use client'

import { useRouter } from 'next/navigation'
import { useAuth } from './auth-context'

export function useRequireAuth(redirectTo: string = '/auth/signin') {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const requireAuth = (callback?: () => void) => {
    if (isLoading) {
      return false
    }

    if (!user) {
      const currentPath = window.location.pathname
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`
      router.push(redirectUrl)
      return false
    }

    if (callback) {
      callback()
    }
    return true
  }

  return { user, isLoading, requireAuth }
}
