'use client'

import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'

import { GlobalContext } from '@context'
import { getSearchMedia } from '@utils/tmdbApiUtils'
import { UnauthPage, ManageAccounts, Navbar, MediaCard } from '@components'

export default function SearchPage({ params }) {
  const { data: session } = useSession()
  const { loggedInAccount, searchResult, setSearchResult } = useContext(GlobalContext)

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />

  useEffect(() => {
    const enhanceMediaResults = (media) => {
      const filteredAndSortMedia = media?.results.length && media.results
        .filter((item) => item.poster_path !== null && item.backdrop_path !== null)
        .sort((a, b) => b.vote_count - a.vote_count)
        .map((item) => ({
          ...item,
          type: item.media_type,
          addedToFavorites: false
        }))

      filteredAndSortMedia.length && setSearchResult(filteredAndSortMedia)
    }

    (async () => {
      enhanceMediaResults(await getSearchMedia(params.query))
    })()
  }, [])

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
