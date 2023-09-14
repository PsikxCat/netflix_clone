'use client'

import { useState, useEffect, useContext } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import ReactPlayer from 'react-player'

import { GlobalContext } from '@context'
import { getMediaVideosById } from '@utils/tmdbApiUtils'
import { UnauthPage, ManageAccounts, CircleLoader } from '@components'

export default function WatchPage({ params }) {
  const { data: session } = useSession()
  const [mediaVid, setMediaVid] = useState({})
  const { pageLoader, setPageLoader, loggedInAccount } = useContext(GlobalContext)

  const { details } = params

  useEffect(() => {
    (async () => {
      const mediaVideosById = await getMediaVideosById(details[0], details[1])

      if (mediaVideosById && mediaVideosById.length) {
        const findTrailer = mediaVideosById.find((video) => video.type === 'Trailer')
        const findClip = mediaVideosById.find((video) => video.type === 'Clip')
        const findFirstVideo = mediaVideosById[0]

        setMediaVid(findTrailer || findClip || findFirstVideo)
      }
    })()

    setPageLoader(false)
  }, [])

  if (session === null) return <UnauthPage />
  if (loggedInAccount === null) return <ManageAccounts />
  if (pageLoader) return <CircleLoader />

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: 'easeInOut' }}
    >
      <ReactPlayer
        style={{ position: 'absolute', top: 0, left: 0 }}
        url={`https://www.youtube.com/watch?v=${mediaVid?.key || 'cFS4Zcd_kb8'}`}
        width="100%"
        height="100%"
        controls
        playing
      />
    </motion.section>
  )
}
