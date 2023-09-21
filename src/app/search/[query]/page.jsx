'use client'

import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

import { GlobalContext } from '@context'
import { getSearchMedia } from '@utils/tmdbApiUtils'
import { getFavorites } from '@utils/apiUtils'
import { UnauthPage, ManageAccounts, Navbar, MediaCard } from '@components'

export default function SearchPage({ params }) {
  const { data: session } = useSession()
  const { loggedInAccount, searchResult, setSearchResult } = useContext(GlobalContext)

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />

  useEffect(() => {
    (async () => {
      try {
        // Se obtiene la respuesta de allFavorites y se extrae el array de favoritos
        const allFavorites = await getFavorites(session?.user?.uid, loggedInAccount?.id)
        // Se obtiene la respuesta de searchMedia y se extrae el array de resultados
        const searchMediaResponse = await getSearchMedia(params.query)
        const media = searchMediaResponse.results
        // Se filtran, se ordenan y se agregan el type y addedToFavorites a cada item
        const filteredAndSortMedia = media
          .filter((item) => item.poster_path !== null && item.backdrop_path !== null)
          .sort((a, b) => b.vote_count - a.vote_count)
          .map((item) => ({
            ...item,
            type: item.media_type,
            addedToFavorites: allFavorites.success && allFavorites.body.accountFavorites.length &&
              allFavorites.body.accountFavorites.map(fav => fav.mediaID).includes(item.id)
          }))

        setSearchResult(filteredAndSortMedia)
      } catch (error) {
        throw new Error('Error fetching search results' + error.message)
      }
    })()
  }, [params.query, session?.user?.uid, loggedInAccount?.id])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Navbar />

      <section className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
        <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
          Showing Results for &apos;{decodeURIComponent(params.query.toLowerCase())}&apos;
        </h2>
        <div className="grid grid-cols-5 justify-start gap-3 scrollbar-hide md:p-2">
          {searchResult
            ? searchResult.map((searchItem) => (
                <MediaCard
                  key={searchItem.id}
                  mediaItem={searchItem}
                  searchView={true}
                />
            ))
            : null}
        </div>
      </section>
    </motion.div>
  )
}
