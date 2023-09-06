'use client'

import { useContext } from 'react'
import { useSession } from 'next-auth/react'

import { UnauthPage, ManageAccounts } from '@components'
import { GlobalContext } from '@context'

export default function SearchPage() {
  const { data: session } = useSession()
  const { loggedInAccount } = useContext(GlobalContext)

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />

  return (
    <div>Search Page</div>
  )
}
