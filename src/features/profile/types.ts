export type UserProfile = {
  userId: string
  firstName: string
  lastName: string
  mobileNumber: string
  gender: string
  city: string
  email: string
  photo: string | null
}

export type CreateProfileInput = {
  userId: string
  password: string
  firstName: string
  lastName: string
  mobileNumber: string
  gender: string
  city: string
  email: string
  photo: File | null
}

export type CreateProfileResponse = {
  success: boolean
  message?: string
}
