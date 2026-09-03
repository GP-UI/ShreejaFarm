type HeaderProps = {
  hasProfile: boolean
  profilePhoto: File | string | null
  onProfileClick: () => void
  onLogout: () => void
}

function Header({ hasProfile, profilePhoto, onProfileClick, onLogout }: HeaderProps) {
  const photoUrl = typeof profilePhoto === 'string'
    ? profilePhoto
    : profilePhoto
      ? URL.createObjectURL(profilePhoto)
      : null

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
        <a href="/" className="flex items-center gap-3" aria-label="Shreeja Farm home">
          <span className="flex size-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm">
            <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M12 20V10" strokeLinecap="round" />
              <path d="M12 14c-4 0-6.5-2.2-7-6 4.3-.2 7 1.7 7 6Z" />
              <path d="M12 11c.3-4.1 2.8-6.4 7-7-.1 4.3-2.4 6.8-7 7Z" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight">Shreeja Farm</span>
        </a>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onProfileClick}
            className="flex size-10 items-center justify-center rounded-full border border-stone-200 bg-stone-50 text-stone-600 transition hover:border-emerald-600 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
            aria-label={hasProfile ? 'Edit user profile' : 'Create user profile'}
          >
            {photoUrl ? (
              <img src={photoUrl} alt="User profile" className="size-10 rounded-full object-cover" />
            ) : (
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <circle cx="12" cy="8" r="3.25" />
                <path d="M5.5 20c.7-3.3 3-5 6.5-5s5.8 1.7 6.5 5" strokeLinecap="round" />
              </svg>
            )}
          </button>
          {hasProfile && (
            <button type="button" onClick={onLogout} className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition hover:bg-stone-100 hover:text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2">
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
