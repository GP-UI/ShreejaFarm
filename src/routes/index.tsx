import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../components/Login'
import ProfileCreation from '../components/ProfileCreation'
import ProfileOverview from '../components/ProfileOverview'
import UserDashboard from '../components/UserDashboard'
import type { Profile } from '../types/profile'
import { ROUTE_PATHS } from './paths'

type AppRoutesProps = {
  profile: Profile | null
  onProfileCreation: (profile: Profile) => Promise<void>
  onLogin: (userId: string, password: string) => Promise<void>
  isAuthenticated: boolean
}

function AppRoutes({ profile, onProfileCreation, onLogin, isAuthenticated }: AppRoutesProps) {
  const authenticatedPath = ROUTE_PATHS.dashboard
  const entryPath = isAuthenticated ? authenticatedPath : ROUTE_PATHS.login

  return (
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
  )
}

export default AppRoutes
