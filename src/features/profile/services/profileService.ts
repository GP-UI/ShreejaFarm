import { API_ENDPOINTS } from '../../../config/api'
import { apiClient, getApiErrorMessage } from '../../../services/apiClient'
import type { CreateProfileInput, CreateProfileResponse } from '../types'

export async function createProfile(profile: CreateProfileInput, photoBase64: string | null, signal?: AbortSignal) {
  try {
    const response = await apiClient.post<CreateProfileResponse>(API_ENDPOINTS.createProfile, {
      userId: profile.userId,
      password: profile.password,
      firstName: profile.firstName,
      lastName: profile.lastName,
      mobileNumber: profile.mobileNumber,
      gender: profile.gender,
      city: profile.city,
      email: profile.email,
      userPhoto: photoBase64,
    }, { signal })

    if (!response.data.success) {
      throw new Error(response.data.message || 'Profile creation failed.')
    }

    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not create your profile.'), { cause: error })
  }
}
