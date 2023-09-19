'use client'

import { useContext } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { PlusIcon, ChevronDownIcon, CheckIcon } from '@heroicons/react/24/outline'

import { GlobalContext } from '@context'
import { createFavorite } from '@utils/apiUtils'

export default function MediaCard(
  { mediaItem, searchView = false, similarMediaView = false, listView = false }
) {
  const BASE_URL = 'https://image.tmdb.org/t/p/w500'
  const { data: session } = useSession()
  const router = useRouter()
  const { loggedInAccount, setCurrentMediaCardInfo, setShowCardModal } = useContext(GlobalContext)

  const handleAddClick = async (mediaItem) => {
    const uid = session?.user?.uid
    const accountID = loggedInAccount && loggedInAccount.id

    await createFavorite(uid, accountID, mediaItem)
  }

  const handleRemoveClick = async (mediaItem) => {
    console.log('remove from favorites') // ! TODO remove from favorites
  }

  const handleMoreInfoClick = (type, id) => {
    setCurrentMediaCardInfo({ type, id })
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
              ? () => handleRemoveClick(mediaItem) // # cambiar orden
              : () => handleAddClick(mediaItem) }
              >
            {
              mediaItem?.addedToFavorites
                ? <CheckIcon className='h-7 w-7' color='#E5E5E5' />
                : <PlusIcon className='h-7 w-7' color='#E5E5E5' />
            }
          </button>

          <button className='cursor-pointer flex-center border p-2 rounded-full transition border-white   bg-black opacity-60 hover:opacity-80'
            onClick={() => handleMoreInfoClick(mediaItem?.type, mediaItem?.id)}
          >
            <ChevronDownIcon className='h-7 w-7' color='#E5E5E5'/>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
