import { createContext, use } from 'react'
import type { CreateProfileInput, UserProfile } from '../features/profile/types'

type AuthContextValue = {
  profile: UserProfile | null
  isAuthenticated: boolean
  login: (userId: string, password: string, signal?: AbortSignal) => Promise<string>
  createProfile: (profile: CreateProfileInput, signal?: AbortSignal) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth() {
  const context = use(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
