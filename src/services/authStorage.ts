import type { Profile } from '../types/profile'

const PROFILE_STORAGE_KEY = 'shreeja_farm_profile'

type StoredProfile = Omit<Profile, 'password' | 'photo'> & {
  photo: string | null
}

export function saveProfile(profile: Profile) {
  const storedProfile: StoredProfile = {
    userId: profile.userId,
    firstName: profile.firstName,
    lastName: profile.lastName,
    mobileNumber: profile.mobileNumber,
    gender: profile.gender,
    city: profile.city,
    email: profile.email,
    photo: typeof profile.photo === 'string' ? profile.photo : null,
  }

  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(storedProfile))
}

export function getStoredProfile(): Profile | null {
  const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY)
  if (!storedProfile) return null

  try {
    const profile = JSON.parse(storedProfile) as StoredProfile
    return {
      ...profile,
      password: '',
    }
  } catch {
    localStorage.removeItem(PROFILE_STORAGE_KEY)
    return null
  }
}

export function clearStoredProfile() {
  localStorage.removeItem(PROFILE_STORAGE_KEY)
}
