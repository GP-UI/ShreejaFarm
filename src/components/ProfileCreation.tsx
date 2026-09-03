import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from './FormField'
import type { CreateProfileInput } from '../types/profile'

export type { CreateProfileInput } from '../types/profile'

type ProfileCreationProps = {
  onCreated: (profile: CreateProfileInput, signal?: AbortSignal) => Promise<void>
}

function ProfileCreation({ onCreated }: ProfileCreationProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const requestController = useRef<AbortController | null>(null)

  useEffect(() => () => requestController.current?.abort(), [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const photo = formData.get('photo')

    setErrorMessage('')
    setIsSubmitting(true)
    requestController.current?.abort()
    requestController.current = new AbortController()

    try {
      await onCreated({
        userId: String(formData.get('userId')),
        password: String(formData.get('password')),
        firstName: String(formData.get('firstName')),
        lastName: String(formData.get('lastName')),
        mobileNumber: String(formData.get('mobileNumber')),
        gender: String(formData.get('gender')),
        city: String(formData.get('city')),
        email: String(formData.get('email')),
        photo: photo instanceof File ? photo : null,
      }, requestController.current.signal)
    } catch {
      if (!requestController.current.signal.aborted) {
        setErrorMessage('We could not create your profile. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-lg rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="profile-title">
      <div className="mb-5">
        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">Welcome to Shreeja Farm</p>
        <h1 id="profile-title" className="text-2xl font-semibold tracking-tight text-stone-950">Create your profile</h1>
        <p className="mt-1.5 text-sm leading-5 text-stone-500">Tell us a little about yourself to get started.</p>
      </div>

      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="User ID" htmlFor="userId">
            <input id="userId" name="userId" type="text" autoComplete="username" required placeholder="Create a User ID" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
          </FormField>

          <FormField label="Password" htmlFor="password">
            <input id="password" name="password" type="password" autoComplete="new-password" required placeholder="Create a password" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
          </FormField>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <FormField label="First name" htmlFor="firstName">
            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required placeholder="Enter your first name" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
          </FormField>

          <FormField label="Last name" htmlFor="lastName">
            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required placeholder="Enter your last name" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
          </FormField>
        </div>

        <FormField label="Mobile number" htmlFor="mobileNumber">
          <input id="mobileNumber" name="mobileNumber" type="tel" autoComplete="tel" required placeholder="Enter your mobile number" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
        </FormField>

        <FormField label="Gender" htmlFor="gender">
          <select id="gender" name="gender" required defaultValue="" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20">
            <option value="" disabled>Select your gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </FormField>

        <FormField label="City" htmlFor="city">
          <input id="city" name="city" type="text" autoComplete="address-level2" required placeholder="Enter your city" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
        </FormField>

        <FormField label="Email" htmlFor="email">
          <input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
        </FormField>

        <FormField label="Photo" htmlFor="photo">
          <input id="photo" name="photo" type="file" accept="image/*" required className="block h-9 w-full cursor-pointer rounded-lg border border-stone-300 bg-white text-xs text-stone-500 file:mr-3 file:border-0 file:border-r file:border-stone-300 file:bg-stone-50 file:px-3 file:py-2 file:text-xs file:font-medium file:text-stone-700 focus:outline-none focus:ring-2 focus:ring-emerald-600/20" />
        </FormField>

        {errorMessage && <p className="text-sm text-red-600" role="alert">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Creating profile...' : 'Create profile'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-stone-500">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-emerald-700 hover:text-emerald-800">Sign in</Link>
      </p>
    </section>
  )
}

export default ProfileCreation
