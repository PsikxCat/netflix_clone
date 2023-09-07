'use client'

import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'

// Si el usuario no esta autenticado, se muestra este componente
export default function UnauthPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        onClick={() => signIn('github')}
        className="flex-center bg-gray-800 text-white px-6 py-3 rounded-md text-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
      >
        Sign In with GitHub
        <AiFillGithub className="inline-block ml-2" />

      </button>
      <button
        onClick={() => signIn('google')}
        className="flex-center bg-gray-800 text-white px-6 py-3 rounded-md text-lg mt-4 hover:bg-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Sign In with Google
        <AiFillGoogleCircle className="inline-block ml-2" />
      </button>
    </div>
  )
}
