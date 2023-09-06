'use client'

import { useContext } from 'react'
import { useSession, signOut } from 'next-auth/react'

import { UnauthPage, ManageAccounts } from '@components'
import { GlobalContext } from '@context'

export default function BrowsePage() {
  const { data: session } = useSession()
  const { loggedInAccount } = useContext(GlobalContext)

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />

  return (
    <div>
      <h1>Browse Page</h1>
      <button onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  )
}
