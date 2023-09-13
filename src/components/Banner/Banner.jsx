import Image from 'next/image'
import { AiFillPlayCircle } from 'react-icons/ai'
import { IoMdInformationCircleOutline } from 'react-icons/io'

export default function Banner({ trendingAllMedia }) {
  const BASE_URL = 'https://image.tmdb.org/t/p/original'

  const createRandomMedia = trendingAllMedia && trendingAllMedia.length
    ? trendingAllMedia[Math.floor(Math.random() * trendingAllMedia.length)]
    : null

  return (
    <section className='flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65hv] lg:justify-end lg:pb-12 lg:pl-24'>
      <div className='absolute top-0 left-0 h-[95vh] w-[99.5vw] -z-10'>
        <Image className='object-cover'
          src={`${BASE_URL}${createRandomMedia?.backdrop_path || createRandomMedia?.poster_path}`}
          alt='Banner Image'
          fill
          priority
        />

        <div className='absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent'/>
      </div>

      <h1 className='text-2xl pt-14 md:text-4xl lg:text-7xl font-bold text-shadow'>
        { createRandomMedia?.title || createRandomMedia?.original_title ||
          createRandomMedia?.name || createRandomMedia?.original_name }
      </h1>

      <p className='text-xs max-w-xs md:text-lg md:max-w-lg lg:max-w-2xl line-clamp-5 text-shadow'>
        {createRandomMedia?.overview}
      </p>

      <div className='flex space-x-3'>
        <button className='flex items-center space-x-2 px-4 py-2 bg-red-600 text-white text-sm md:text-lg lg:text-xl rounded-md transition hover:opacity-75'>
          <AiFillPlayCircle className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8'/>
          <span>Play</span>
        </button>

        <button className='flex items-center space-x-2 px-4 py-2 bg-[#ffffff] text-black text-sm md:text-lg lg:text-xl rounded-md transition hover:opacity-75'>
          <IoMdInformationCircleOutline className='w-4 h-4 md:w-6 md:h-6 lg:w-8 lg:h-8'/>
          <span>More Info</span>
        </button>
      </div>
    </section>
  )
}
