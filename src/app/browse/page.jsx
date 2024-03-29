'use client'

import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { GlobalContext } from '@context'
import { getTrendingMedia, getMediaList } from '@utils/tmdbApiUtils'
import { getFavorites } from '@utils/apiUtils'
import { UnauthPage, ManageAccounts, CommonLayout, CircleLoader } from '@components'

export default function BrowsePage() {
  const { data: session } = useSession()
  const {
    loggedInAccount,
    pageLoader,
    setPageLoader,
    trendingAllMedia,
    setTrendingAllMedia,
    mediaData,
    setMediaData,
  } = useContext(GlobalContext)

  useEffect(() => {
    (async () => {
      const trendingAllShows = await getTrendingMedia('all', 'week')
      const trendingMedia = trendingAllShows.map((mediaItem) => ({
        ...mediaItem,
        type: mediaItem.media_type,
        addedToFavorites: false
      }))
      setTrendingAllMedia(trendingMedia)

      const trendingTvShows = await getTrendingMedia('tv', 'week')
      const popularTvShows = await getMediaList('tv', 'popular')
      const topRatedTvShows = await getMediaList('tv', 'top_rated')

      const trendingMovies = await getTrendingMedia('movie', 'week')
      const popularMovies = await getMediaList('movie', 'popular')
      const topRatedMovies = await getMediaList('movie', 'top_rated')

      const allFavorites = await getFavorites(session?.user?.uid, loggedInAccount?.id)

      setMediaData([
        ...[
          { title: 'Trending TV Shows', media: trendingTvShows },
          { title: 'Popular TV Shows', media: popularTvShows },
          { title: 'Top Rated TV Shows', media: topRatedTvShows },
        ].map((data) => ({
          ...data,
          media: data.media.map((mediaItem) => ({
            ...mediaItem,
            type: 'tv',
            addedToFavorites: allFavorites.success && allFavorites.body.accountFavorites.length &&
              allFavorites.body.accountFavorites.map(fav => fav.mediaID).includes(mediaItem.id)
          })),
        })),
        ...[
          { title: 'Trending Movies', media: trendingMovies },
          { title: 'Popular Movies', media: popularMovies },
          { title: 'Top Rated Movies', media: topRatedMovies },
        ].map((data) => ({
          ...data,
          media: data.media.map((mediaItem) => ({
            ...mediaItem,
            type: 'movie',
            addedToFavorites: allFavorites.success && allFavorites.body.accountFavorites.length &&
              allFavorites.body.accountFavorites.map(fav => fav.mediaID).includes(mediaItem.id)
          })),
        })),
      ])

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
