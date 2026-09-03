export type Profile = {
  userId: string
  password: string
  firstName: string
  lastName: string
  mobileNumber: string
  gender: string
  city: string
  email: string
  photo: File | string | null
}

export type LoginResponse = {
  success: boolean
  message: string
  user: {
    id: number
    userId: string
    firstName: string
    lastName: string
    mobileNumber: string
    gender: string
    city: string
    email: string
    userPhoto?: string | null
  }
}
