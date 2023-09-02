'use client'

import { useSession, signOut } from 'next-auth/react'

import { UnauthPage } from '@components'

export default function BrowsePage() {
  const { data: session } = useSession()
  if (session === null) return <UnauthPage />

  return (
    <div>
      <h1>Browse Page</h1>
      <button onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  )
}
