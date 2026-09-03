import type { Profile } from '../types/profile'

type ProfileOverviewProps = {
  profile: Profile
}

function ProfileOverview({ profile }: ProfileOverviewProps) {
  const photoUrl = typeof profile.photo === 'string'
    ? profile.photo
    : profile.photo
      ? URL.createObjectURL(profile.photo)
      : null

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-stone-950">Profile overview</h2>
        <p className="mt-1 text-sm text-stone-500">Your personal information and account details.</p>
      </div>

      <div className="grid gap-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:grid-cols-[auto_1fr] sm:p-8">
        {photoUrl ? (
          <img src={photoUrl} alt={`${profile.firstName} ${profile.lastName}`} className="size-24 rounded-full object-cover ring-4 ring-emerald-50" />
        ) : (
          <div className="flex size-24 items-center justify-center rounded-full bg-emerald-100 text-2xl font-semibold text-emerald-800">
            {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
          </div>
        )}

        <dl className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-stone-500">Name</dt>
            <dd className="mt-1 font-medium text-stone-900">{profile.firstName} {profile.lastName}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Mobile number</dt>
            <dd className="mt-1 font-medium text-stone-900">{profile.mobileNumber}</dd>
          </div>
          <div>
            <dt className="text-stone-500">Gender</dt>
            <dd className="mt-1 font-medium capitalize text-stone-900">{profile.gender.replaceAll('-', ' ')}</dd>
          </div>
          <div>
            <dt className="text-stone-500">City</dt>
            <dd className="mt-1 font-medium text-stone-900">{profile.city}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-stone-500">Email</dt>
            <dd className="mt-1 font-medium text-stone-900">{profile.email}</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

export default ProfileOverview
