'use client'

import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { GlobalContext } from '@context'
import { getTrendingMedia, getMediaByGenre } from '@utils/tmdbApiUtils'
import { UnauthPage, ManageAccounts, CommonLayout, CircleLoader } from '@components'

export default function TVPage() {
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
      const trendingTvShows = await getTrendingMedia('tv', 'day')
      setTrendingAllMedia(trendingTvShows)

      const actionGenre = await getMediaByGenre('tv', 10759)
      const scifiGenre = await getMediaByGenre('tv', 10765)
      const comedyGenre = await getMediaByGenre('tv', 35)
      const dramaGenre = await getMediaByGenre('tv', 18)
      const mysteryGenre = await getMediaByGenre('tv', 9648)
      const animationGenre = await getMediaByGenre('tv', 16)
      const crimeGenre = await getMediaByGenre('tv', 80)
      const familyGenre = await getMediaByGenre('tv', 10751)
      const warGenre = await getMediaByGenre('tv', 10768)

      setMediaData([
        { title: 'Action & Adventure', media: actionGenre },
        { title: 'Sci-Fi & Fantasy', media: scifiGenre },
        { title: 'Comedy', media: comedyGenre },
        { title: 'Drama', media: dramaGenre },
        { title: 'Mystery', media: mysteryGenre },
        { title: 'Animation', media: animationGenre },
        { title: 'Crime', media: crimeGenre },
        { title: 'Family', media: familyGenre },
        { title: 'War & Politics', media: warGenre },
      ].map((data) => ({
        ...data,
        media: data.media.map((mediaItem) => ({
          ...mediaItem,
          type: 'tv',
          addedToFavorites: false
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
