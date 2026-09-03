import axios from 'axios'
import type { LoginResponse, Profile } from '../types/profile'
import { API_BASE_URL, API_ENDPOINTS } from '../config/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message
    if (typeof serverMessage === 'string' && serverMessage.trim()) {
      return serverMessage
    }

    if (!error.response) {
      return 'Unable to connect to the server. Please try again.'
    }
  }

  return fallbackMessage
}

export async function login(userId: string, password: string) {
  try {
    const response = await apiClient.post<LoginResponse>(API_ENDPOINTS.login, {
      userId,
      password,
    })

    if (!response.data.success || !response.data.user) {
      throw new Error(response.data.message || 'Login failed.')
    }

    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Invalid User ID or Password.'), { cause: error })
  }
}

export function profileFromLoginResponse(loginResponse: LoginResponse): Profile {
  return {
    userId: loginResponse.user.userId,
    password: '',
    firstName: loginResponse.user.firstName,
    lastName: loginResponse.user.lastName,
    mobileNumber: loginResponse.user.mobileNumber,
    gender: loginResponse.user.gender,
    city: loginResponse.user.city,
    email: loginResponse.user.email,
    photo: loginResponse.user.userPhoto ?? null,
  }
}

export async function createProfile(profile: Profile, photoBase64: string | null) {
  try {
    const response = await apiClient.post(API_ENDPOINTS.createProfile, {
      userId: profile.userId,
      password: profile.password,
      firstName: profile.firstName,
      lastName: profile.lastName,
      mobileNumber: profile.mobileNumber,
      gender: profile.gender,
      city: profile.city,
      email: profile.email,
      userPhoto: photoBase64,
    })

    return response.data
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not create your profile.'), { cause: error })
  }
}
