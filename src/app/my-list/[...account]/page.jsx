'use client'

import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

import { GlobalContext } from '@context'
import { CircleLoader, ManageAccounts, MediaCard, Navbar, UnauthPage } from '@components'
import { getFavorites } from '@utils/apiUtils'

export default function MyListPage() {
  const { data: session } = useSession()
  const {
    loggedInAccount,
    pageLoader,
    setPageLoader,
    favorites,
    setFavorites
  } = useContext(GlobalContext)

  useEffect(() => {
    (async () => {
      const uid = session?.user?.uid
      const accountID = loggedInAccount && loggedInAccount.id

      const response = await getFavorites(uid, accountID)

      if (response?.success && response.body.accountFavorites?.length) {
        const data = response.body.accountFavorites
        setFavorites(data)
      }

      pageLoader && setPageLoader(false)
    })()
  }, [loggedInAccount])

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />
  if (pageLoader) return <CircleLoader />

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />

      <section className='mt-[100px] px-4 space-y-0.5 md:space-y-2 '>
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          {loggedInAccount.name}&apos;s favorites
        </h2>
        <div className="grid grid-cols-5 justify-start gap-3 scrollbar-hide md:p-2">
          {favorites && favorites.length
            ? favorites.map((favItem) => (
                <MediaCard
                  key={favItem.id}
                  mediaItem={favItem}
                  listView={true}
                />
            ))
            : <p className="text-[#e5e5e5] text-sm">No favorites yet</p>}
        </div>
      </section>
    </motion.div>
  )
}
