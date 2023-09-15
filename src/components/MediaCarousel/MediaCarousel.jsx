'use client'

import { MediaCard } from '@components'

export default function MediaCarousel({ title, media }) {
  return (
    <section className="h-40 space-y-0.5 md:space-y-2 px-4">
      <h2 className="cursor-pointer text-sm md:text-2xl font-semibold text-[#E5E5E5] transition-colors duration-200 hover:text-white text-shadow">
        {title}
      </h2>

      <div className="relative md:ml-2">
        <div className="flex items-center overflow-x-scroll space-x-0.5 md:space-x-2.5 md:p-2 scrollbar-hide md:hover:!scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-[#DC262682]">
          {
            media && media.length &&
            media.filter(item => item.backdrop_path !== null && item.poster_path !== null)
              .map(item => (
                <MediaCard
                  key={item.id}
                  mediaItem={item}
                />
              ))
          }
        </div>

      </div>
    </section>
  )
}
