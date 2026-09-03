import axios from 'axios'
import { API_BASE_URL } from '../config/api'

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
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
