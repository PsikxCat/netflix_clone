'use client'

import { useSession } from 'next-auth/react'
import { useContext } from 'react'

import { UnauthPage, ManageAccounts } from '@components'
import { GlobalContext } from '@context'

export default function MoviesPage() {
  const { data: session } = useSession()
  const { loggedInAccount } = useContext(GlobalContext)

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />

  return (
    <div>Movies Page</div>
  )
}
