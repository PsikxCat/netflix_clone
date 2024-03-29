'use client'
import { useRouter } from 'next/navigation'

import { signOut } from 'next-auth/react'

export default function AccountMenu({ setShowAccountMenu, setLoggedInAccount, setPageLoader }) {
  const router = useRouter()

  const handleBackToAccounts = () => {
    setShowAccountMenu(false)
    setPageLoader(false)
    setLoggedInAccount(null)
    sessionStorage.removeItem('loggedInAccount')
    router.push('/')
  }

  const handleSignOut = async () => {
    await signOut()
    handleBackToAccounts()
  }

  return (
    <>
      <p className='text-white text-xl font-bold p-1'>
        {JSON.parse(sessionStorage.getItem('loggedInAccount')).name}
      </p>

      <div className='flex flex-col flex-center gap-3'>
        <button className='text-sm bg-red-600 text-white px-4 py-2 rounded-md'
          onClick={handleBackToAccounts}>
          Back to Accounts
        </button>

        <button className='text-sm bg-white text-black px-4 py-2 rounded-md'
          onClick={handleSignOut}>
          Sign Out of Netflix
        </button>
      </div>
    </>
  )
}
