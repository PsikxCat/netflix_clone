import { useContext, useEffect } from 'react'
import { motion } from 'framer-motion'
import MuiModal from '@mui/material/Modal'
import { XMarkIcon } from '@heroicons/react/24/outline'
import ReactPlayer from 'react-player'

import { GlobalContext } from '@context'
import { getMediaDetails, getSimilarMedia } from '@utils/tmdbApiUtils'
import { MediaCard } from '@components'

export default function MoreInfoPopup({ show, setShow }) {
  const {
    currentMediaCardInfo,
    setCurrentMediaCardInfo,
    mediaDetails,
    setMediaDetails,
    similarMedia,
    setSimilarMedia
  } = useContext(GlobalContext)

  useEffect(() => {
    const filteredAndSortMedia = (similarMedia) => {
      if (similarMedia && similarMedia.length) {
        return similarMedia
          .filter((item) => item.poster_path !== null && item.backdrop_path !== null)
          .sort((a, b) => b.vote_count - a.vote_count)
          .map((item) => ({
            ...item,
            type: currentMediaCardInfo.type,
            addedToFavorites: false
          }))
      } else return []
    }

    (async () => {
      const details = await getMediaDetails(currentMediaCardInfo.type, currentMediaCardInfo.id)
      const similar = await getSimilarMedia(currentMediaCardInfo.type, currentMediaCardInfo.id)

      if (details && details.length) {
        const findClip = details.find((video) => video.type === 'Clip')
        const findTrailer = details.find((video) => video.type === 'Trailer')
        const findFirstVideo = details[0]

        setMediaDetails(findClip || findTrailer || findFirstVideo)
      }

      setSimilarMedia(filteredAndSortMedia(similar))
    })()
  }, [currentMediaCardInfo])

  const handleClose = () => {
    setShow(false)
    setCurrentMediaCardInfo({ type: '', id: 0 })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <MuiModal className='fixed top-7 left-0 right-0 z-50 w-full mx-auto max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide rounded-md'
        open={show}
        >
        <>
          <button className='flex-center h-9 w-9 rounded-full fixed top-5 right-5 z-40 bg-red-800 hover:bg-red-600 border-none'
            onClick={handleClose}
          >
            <XMarkIcon className='h-6 w-6 text-white' />
          </button>

          <div className='relative pt-[55%]'>
            <ReactPlayer
              style={{ position: 'absolute', top: 0, left: 0 }}
              url={`https://www.youtube.com/watch?v=${mediaDetails?.key || 'cFS4Zcd_kb8'}`}
              width="100%"
              height="100%"
              controls
              playing
            />
          </div>

          <div className="rounded-b-md bg-[#181818] p-8">
            <h2 className="cursor-pointer mt-3 text-sm md:text-2xl font-semibold text-[#E5E5E5] transition-colors duration-200 hover:text-white text-shadow">
              More like this
            </h2>

            <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
              {
                similarMedia && similarMedia.length &&
                similarMedia.map((item) => (
                  <MediaCard
                    key={item.id}
                    mediaItem={item}
                    similarMediaView={true}
                  />
                ))
              }
            </div>
          </div>
        </>
      </MuiModal>
    </motion.div>
  )
}
