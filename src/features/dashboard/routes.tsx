import { lazy, type ReactElement } from 'react'
import { Navigate, Route } from 'react-router-dom'
import ProfileOverview from '../profile/components/ProfileOverview'
import OrdersPage from './pages/OrdersPage'
import SettingsPage from './pages/SettingsPage'
import type { UserProfile } from '../profile/types'

const UserDashboard = lazy(() => import('./components/UserDashboard'))

type DashboardRoutesProps = {
  profile: UserProfile | null
  isAuthenticated: boolean
}

export function createDashboardRoute({ profile, isAuthenticated }: DashboardRoutesProps): ReactElement {
  return (
    <Route path="/dashboard" element={isAuthenticated ? <UserDashboard profile={profile} /> : <Navigate to="/login" replace />}>
      <Route index element={<Navigate to="profile" replace />} />
      <Route path="profile" element={profile ? <ProfileOverview profile={profile} /> : <h2 className="text-2xl font-semibold text-stone-950">Your dashboard</h2>} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>
  )
}
