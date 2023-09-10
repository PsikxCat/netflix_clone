'use client'

import { signOut } from 'next-auth/react'

export default function AccountMenu({ setShowAccountMenu, setLoggedInAccount, setPageLoader }) {
  const handleBackToAccounts = () => {
    setShowAccountMenu(false)
    setPageLoader(true)
    setLoggedInAccount(null)
    sessionStorage.removeItem('loggedInAccount')
  }

  const handleSignOut = async () => {
    await signOut()
    handleBackToAccounts()
  }

  return (
    <div className="flex items-end flex-col fixed top-[55px] right-[12px] z-50 rounded-md bg-black bg-opacity-90 p-4 space-y-5">
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
    </div>
  )
}
