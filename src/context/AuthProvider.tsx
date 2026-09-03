import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { CreateProfileInput, UserProfile } from '../types/profile'
import { fileToBase64 } from '../services/fileService'
import { clearStoredProfile, getStoredProfile, saveProfile } from '../services/authStorage'
import { createProfile as createProfileRequest, login as loginRequest, profileFromLoginResponse } from '../services/userService'

type AuthProviderProps = {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [profile, setProfile] = useState<UserProfile | null>(() => getStoredProfile())

  async function login(userId: string, password: string, signal?: AbortSignal) {
    const loginResult = await loginRequest(userId, password, signal)
    const loggedInProfile = profileFromLoginResponse(loginResult)

    setProfile(loggedInProfile)
    saveProfile(loggedInProfile)
    return loginResult.message || 'Login successful.'
  }

  async function createProfile(profileToCreate: CreateProfileInput, signal?: AbortSignal) {
    const photoBase64 = profileToCreate.photo
      ? await fileToBase64(profileToCreate.photo)
      : null

    await createProfileRequest(profileToCreate, photoBase64, signal)

    const savedProfile: UserProfile = {
      userId: profileToCreate.userId,
      firstName: profileToCreate.firstName,
      lastName: profileToCreate.lastName,
      mobileNumber: profileToCreate.mobileNumber,
      gender: profileToCreate.gender,
      city: profileToCreate.city,
      email: profileToCreate.email,
      photo: photoBase64,
    }
    setProfile(savedProfile)
    saveProfile(savedProfile)
  }

  function logout() {
    clearStoredProfile()
    setProfile(null)
  }

  return (
    <AuthContext value={{
      profile,
      isAuthenticated: profile !== null,
      login,
      createProfile,
      logout,
    }}>
      {children}
    </AuthContext>
  )
}
