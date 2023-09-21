'use client'

import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { GlobalContext } from '@context'
import { getTrendingMedia, getMediaByGenre } from '@utils/tmdbApiUtils'
import { getFavorites } from '@utils/apiUtils'
import { UnauthPage, ManageAccounts, CommonLayout, CircleLoader } from '@components'

export default function MoviesPage() {
  const { data: session } = useSession()
  const {
    loggedInAccount,
    pageLoader,
    setPageLoader,
    trendingAllMedia,
    setTrendingAllMedia,
    mediaData,
    setMediaData
  } = useContext(GlobalContext)

  useEffect(() => {
    (async () => {
      const trendingMovieShows = await getTrendingMedia('movie', 'day')
      const trendingMedia = trendingMovieShows.map((mediaItem) => ({
        ...mediaItem,
        type: mediaItem.media_type,
        addedToFavorites: false
      }))
      setTrendingAllMedia(trendingMedia)

      const actionGenre = await getMediaByGenre('movie', 28)
      const horrorGenre = await getMediaByGenre('movie', 27)
      const animationGenre = await getMediaByGenre('movie', 16)
      const scifiGenre = await getMediaByGenre('movie', 878)
      const romanceGenre = await getMediaByGenre('movie', 10749)
      const comedyGenre = await getMediaByGenre('movie', 35)
      const fantasyGenre = await getMediaByGenre('movie', 14)
      const crimeGenre = await getMediaByGenre('movie', 80)
      const thrillerGenre = await getMediaByGenre('movie', 53)

      const allFavorites = await getFavorites(session?.user?.uid, loggedInAccount?.id)

      setMediaData([
        { title: 'Action', media: actionGenre },
        { title: 'Horror', media: horrorGenre },
        { title: 'Animation', media: animationGenre },
        { title: 'Sci-Fi', media: scifiGenre },
        { title: 'Romance', media: romanceGenre },
        { title: 'Comedy', media: comedyGenre },
        { title: 'Fantasy', media: fantasyGenre },
        { title: 'Crime', media: crimeGenre },
        { title: 'Thriller', media: thrillerGenre },
      ].map((data) => ({
        ...data,
        media: data.media.map((mediaItem) => ({
          ...mediaItem,
          type: 'movie',
          addedToFavorites: allFavorites.success && allFavorites.body.accountFavorites.length &&
          allFavorites.body.accountFavorites.map(fav => fav.mediaID).includes(mediaItem.id)
        })),
      })))

      pageLoader && setPageLoader(false)
    })()
  }, [])

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />
  if (pageLoader) return <CircleLoader />

  return (
    <main className='flex min-h-screen flex-col no-select'>
      <CommonLayout
        trendingAllMedia={trendingAllMedia}
        mediaData={mediaData}
      />
    </main>
  )
}
