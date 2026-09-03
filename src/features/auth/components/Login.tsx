import type { FormEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import FormField from '../../../components/FormField'

type LoginProps = {
  onLogin: (userId: string, password: string, signal?: AbortSignal) => Promise<void>
}

function Login({ onLogin }: LoginProps) {
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const requestController = useRef<AbortController | null>(null)

  useEffect(() => () => requestController.current?.abort(), [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const userId = String(formData.get('userId'))
    const password = String(formData.get('password'))

    if (!userId || !password) {
      setErrorMessage('Please enter your User ID and Password.')
      return
    }

    setErrorMessage('')
    setIsSubmitting(true)
    requestController.current?.abort()
    requestController.current = new AbortController()

    try {
      await onLogin(userId, password, requestController.current.signal)
    } catch (error) {
      if (!requestController.current.signal.aborted) {
        setErrorMessage(error instanceof Error ? error.message : 'Invalid User ID or Password. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="login-title">
      <div className="mb-5">
        <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">Shreeja Farm</p>
        <h1 id="login-title" className="text-2xl font-semibold tracking-tight text-stone-950">Welcome back</h1>
        <p className="mt-1.5 text-sm leading-5 text-stone-500">Sign in to continue to your account.</p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <FormField label="User ID" htmlFor="login-userId">
          <input id="login-userId" name="userId" type="text" autoComplete="username" required placeholder="Enter your User ID" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
        </FormField>

        <FormField label="Password" htmlFor="login-password">
          <input id="login-password" name="password" type="password" autoComplete="current-password" required placeholder="Enter your password" className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20" />
        </FormField>

        {errorMessage && <p className="text-sm text-red-600" role="alert">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? 'Signing in...' : 'Login'}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-stone-500">
        New to Shreeja Farm?{' '}
        <Link to="/profile/create" className="font-medium text-emerald-700 hover:text-emerald-800">Sign up</Link>
      </p>
    </section>
  )
}

export default Login
