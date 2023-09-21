'use client'

import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PlusIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'

import { GlobalContext } from '@context'
import { createFavorite, deleteFavorite, getFavorites } from '@utils/apiUtils'

export default function MediaCard(
  { mediaItem, title, searchView = false, similarMediaView = false, listView = false }
) {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500'
  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const {
    loggedInAccount,
    setCurrentMediaCardInfo,
    setShowCardModal,
    setFavorites,
    setSearchResult,
    setSimilarMedia,
    setMediaData
  } = useContext(GlobalContext)

  const handleFavoriteClick = async (mediaItem, isAdding) => {
    const { type, mediaID, id } = mediaItem

    // Lógica para crear o eliminar el favorito
    const response = isAdding
      ? await createFavorite(session?.user?.uid, loggedInAccount?.id, mediaItem)
      : await deleteFavorite(type, mediaID, id)

    if (!response?.success) return

    const updateFavorites = async () => {
      const response = await getFavorites(session?.user?.uid, loggedInAccount?.id)

      if (response?.success) {
        setFavorites(response.body.accountFavorites.map((item) => ({
          ...item,
          addedToFavorites: true
        })))
      }
    }

    // Actualizar el estado según el caso
    if (pathname.includes('my-list') && !similarMediaView) updateFavorites()
    else if (searchView) {
      const updatedResults = (prev) => prev.map((item) =>
        item.id === mediaItem.id ? { ...item, addedToFavorites: isAdding } : item
      )
      setSearchResult(updatedResults)
    } else if (similarMediaView) {
      setSimilarMedia((prev) => prev.map((item) =>
        item.id === mediaItem.id ? { ...item, addedToFavorites: isAdding } : item
      ))
      if (pathname.includes('my-list')) updateFavorites()
    } else {
      setMediaData((prev) => {
        const updatedMedia = [...prev]
          .filter((item) => item.title === title)[0].media
          .map((media) => media.id === mediaItem.id
            ? { ...media, addedToFavorites: isAdding }
            : media
          )

        return [...prev].map((item) => item.title === title
          ? { ...item, media: updatedMedia }
          : item
        )
      })
    }
  }

  const handleAddClick = async (mediaItem) => {
    await handleFavoriteClick(mediaItem, true)
  }

  const handleRemoveClick = async (mediaItem) => {
    await handleFavoriteClick(mediaItem, false)
  }

  const handleMoreInfoClick = (mediaItem) => {
    const { type, id } = mediaItem

    setCurrentMediaCardInfo({
      type,
      id: listView ? mediaItem?.mediaID : id,
      // esto ya que desde my-list se toman los valores de la DB y no de la API
    })

    setShowCardModal(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0, 0.71, 0.2, 1.01] }}
    >
      <div className='cardWrapper relative h-28 min-w-[180px] max-w-[440px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[9] rounded-md' >
        <Image className='rounded-md object-cover no-drag'
          src={`${BASE_URL}${mediaItem?.backdrop_path || mediaItem?.poster_path}`}
          alt='media card'
          fill
          sizes='(min-width: 640px) 260px, 180px'
          onClick={() => router.push(`/watch/${mediaItem?.type}/${mediaItem?.id}`)}
        />

        <div className='buttonWrapper hidden absolute bottom-0 p-2 space-x-3'>
          <button className='cursor-pointer flex-center border p-2 rounded-full transition border-white   bg-black opacity-60 hover:opacity-80'
            onClick={ mediaItem?.addedToFavorites
              ? () => handleRemoveClick(mediaItem)
              : () => handleAddClick(mediaItem) }
              >
            {
              mediaItem?.addedToFavorites
                ? <CheckIcon className='h-7 w-7' color='#49C900' />
                : <PlusIcon className='h-7 w-7' color='#E5E5E5' />
            }
          </button>

          <button className='cursor-pointer flex-center border p-2 rounded-full transition border-white   bg-black opacity-60 hover:opacity-80'
            onClick={() => handleMoreInfoClick(mediaItem)}
          >
            <ChevronDownIcon className='h-7 w-7' color='#E5E5E5'/>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
