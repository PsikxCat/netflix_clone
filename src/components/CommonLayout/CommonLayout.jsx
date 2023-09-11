'use client'

import { motion } from 'framer-motion'
import Head from 'next/head'

import { Navbar, Banner, MediaCarousel } from '@components'

export default function CommonLayout({ trendingAllMedia, mediaData }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <Head>
        <title>Netflix Clone</title>
        { /* agregar las demas propiedades */ }
      </Head>
      <>
        <Navbar />

        <div className='relative pl-4 pb-24 lg:space-y-24'>
          <Banner
            trendingAllMedia={trendingAllMedia}
          />

          <section className='md:space-y-16'>
            {
              mediaData && mediaData.length
                ? mediaData.map(section => (
                  <MediaCarousel
                    key={section.title}
                    title={section.title}
                    media={section.media}
                  />
                ))
                : null
            }
          </section>
        </div>
      </>
    </motion.div>
  )
}
