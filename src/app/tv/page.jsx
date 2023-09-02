'use client'

import { UnauthPage } from '@components'
import { useSession } from 'next-auth/react'

export default function TVPage() {
  const { data: session } = useSession()
  if (session === null) return <UnauthPage />

  return (
    <div>TV Page</div>
  )
}
