import { useState } from 'react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import { NotificationProvider } from './components/NotificationProvider'
import { useNotification } from './components/notificationContext'
import type { Profile } from './types/profile'
import { createProfile, login, profileFromLoginResponse } from './services/userService'
import { fileToBase64 } from './services/fileService'
import { clearStoredProfile, getStoredProfile, saveProfile } from './services/authStorage'
import AppRoutes from './routes'

function AppShell() {
  const [profile, setProfile] = useState<Profile | null>(() => getStoredProfile())
  const [isAuthenticated, setIsAuthenticated] = useState(() => getStoredProfile() !== null)
  const navigate = useNavigate()
  const { notify } = useNotification()

  const handleProfileCreation = async (createdProfile: Profile) => {
    const photoBase64 = createdProfile.photo instanceof File
      ? await fileToBase64(createdProfile.photo)
      : createdProfile.photo

    await createProfile(createdProfile, photoBase64)

    const savedProfile = { ...createdProfile, password: '', photo: photoBase64 }
    saveProfile(savedProfile)
    setProfile(savedProfile)
    setIsAuthenticated(true)
    notify({ type: 'success', message: 'Profile created successfully.' })
    navigate('/dashboard')
  }

  const handleLogin = async (userId: string, password: string) => {
    const loginResult = await login(userId, password)

    const loggedInProfile = profileFromLoginResponse(loginResult)
    setProfile(loggedInProfile)
    saveProfile(loggedInProfile)
    setIsAuthenticated(true)
    notify({ type: 'success', message: loginResult.message || 'Login successful.' })
    navigate('/dashboard')
  }

  const handleLogout = () => {
    clearStoredProfile()
    setProfile(null)
    setIsAuthenticated(false)
    notify({ type: 'success', message: 'You have been logged out.' })
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <Header
        hasProfile={profile !== null}
        profilePhoto={profile?.photo ?? null}
        onProfileClick={() => navigate('/profile/create')}
        onLogout={handleLogout}
      />

      <main className="flex min-h-[calc(100vh-9rem)] flex-1 items-start justify-center px-5 pb-5 pt-30 sm:px-8 sm:pb-16 sm:pt-30">
        <AppRoutes
          profile={profile}
          onProfileCreation={handleProfileCreation}
          onLogin={handleLogin}
          isAuthenticated={isAuthenticated}
        />
      </main>

      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <NotificationProvider>
        <AppShell />
      </NotificationProvider>
    </BrowserRouter>
  )
}

export default App
