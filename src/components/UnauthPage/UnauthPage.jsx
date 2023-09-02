'use client'

import { signIn } from 'next-auth/react'

// Si el usuario no esta autenticado, se muestra este componente
export default function UnauthPage() {
  return (
    <div className='flex gap-3 container'>
      <button onClick={() => signIn('github')} >
        Sign In with GitHub
      </button>
      <button onClick={() => signIn('google')} >
        Sign In with Google
      </button>
    </div>
  )
}
