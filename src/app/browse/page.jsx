'use client'

import { useContext } from 'react'
import { useSession } from 'next-auth/react'

import { UnauthPage, ManageAccounts, CommonLayout } from '@components'
import { GlobalContext } from '@context'

export default function BrowsePage() {
  const { data: session } = useSession()
  const { loggedInAccount } = useContext(GlobalContext)

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />

  return (
    <main className='flex min-h-screen flex-col'>
      <CommonLayout />
    </main>
  )
}
