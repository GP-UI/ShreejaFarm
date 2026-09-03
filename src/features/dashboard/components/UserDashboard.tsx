import { NavLink, Outlet } from 'react-router-dom'
import type { UserProfile } from '../../profile/types'
import type { DashboardMenuItem } from '../types'

type UserDashboardProps = {
  profile: UserProfile | null
}

const menuItems: DashboardMenuItem[] = [
  { path: 'profile', label: 'Profile overview' },
  { path: 'orders', label: 'My orders' },
  { path: 'settings', label: 'Settings' },
]

function UserDashboard({ profile }: UserDashboardProps) {
  return (
    <section className="w-full max-w-6xl" aria-labelledby="dashboard-title">
      <div className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">User dashboard</p>
        <h1 id="dashboard-title" className="text-3xl font-semibold tracking-tight text-stone-950">Welcome{profile ? `, ${profile.firstName}` : ''}</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="h-fit rounded-2xl border border-stone-200 bg-white p-3 shadow-sm" aria-label="Dashboard menu">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink to={item.path} className={({ isActive }) => `block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${isActive ? 'bg-emerald-700 text-white' : 'text-stone-600 hover:bg-emerald-50 hover:text-emerald-800'}`}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="min-w-0 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <Outlet context={{ profile }} />
        </div>
      </div>
    </section>
  )
}

export default UserDashboard
