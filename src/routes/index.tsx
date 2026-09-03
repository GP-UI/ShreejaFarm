import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import RouteLoading from '../components/RouteLoading'
import type { CreateProfileInput, UserProfile } from '../types/profile'
import { ROUTE_PATHS } from './paths'

const Login = lazy(() => import('../components/Login'))
const ProfileCreation = lazy(() => import('../components/ProfileCreation'))
const ProfileOverview = lazy(() => import('../components/ProfileOverview'))
const UserDashboard = lazy(() => import('../components/UserDashboard'))

type AppRoutesProps = {
  profile: UserProfile | null
  onProfileCreation: (profile: CreateProfileInput, signal?: AbortSignal) => Promise<void>
  onLogin: (userId: string, password: string, signal?: AbortSignal) => Promise<void>
  isAuthenticated: boolean
}

function AppRoutes({ profile, onProfileCreation, onLogin, isAuthenticated }: AppRoutesProps) {
  const authenticatedPath = ROUTE_PATHS.dashboard
  const entryPath = isAuthenticated ? authenticatedPath : ROUTE_PATHS.login

  return (
    <Suspense fallback={<RouteLoading />}>
      <Routes>
        <Route
          path={ROUTE_PATHS.login}
          element={isAuthenticated ? <Navigate to={authenticatedPath} replace /> : <Login onLogin={onLogin} />}
        />
        <Route
          path={ROUTE_PATHS.profileCreate}
          element={<ProfileCreation onCreated={onProfileCreation} />}
        />
        <Route
          path={ROUTE_PATHS.dashboard}
          element={isAuthenticated ? <UserDashboard profile={profile} /> : <Navigate to={entryPath} replace />}
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={profile ? <ProfileOverview profile={profile} /> : <h2 className="text-2xl font-semibold text-stone-950">Your dashboard</h2>} />
          <Route path="orders" element={<h2 className="text-2xl font-semibold text-stone-950">My orders</h2>} />
          <Route path="settings" element={<h2 className="text-2xl font-semibold text-stone-950">Settings</h2>} />
        </Route>
        <Route path="*" element={<Navigate to={entryPath} replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
