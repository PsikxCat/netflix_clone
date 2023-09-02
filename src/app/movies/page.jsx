'use client'

import { UnauthPage } from '@components'
import { useSession } from 'next-auth/react'

export default function MoviesPage() {
  const { data: session } = useSession()
  if (session === null) return <UnauthPage />

  return (
    <div>Movies Page</div>
  )
}
