'use client'

import { motion } from 'framer-motion'
import Head from 'next/head'

import { Navbar } from '@components'

export default function CommonLayout() {
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
      </>
    </motion.div>
  )
}
