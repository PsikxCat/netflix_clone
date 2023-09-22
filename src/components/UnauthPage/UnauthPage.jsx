'use client'

import { useContext } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { AiFillGoogleCircle, AiFillGithub } from 'react-icons/ai'
import { signIn } from 'next-auth/react'

import { GlobalContext } from '@context/index'

// Si el usuario no esta autenticado, se muestra este componente
export default function UnauthPage() {
  const { setPageLoader } = useContext(GlobalContext)

  const handleSignIn = (provider) => {
    signIn(provider)
    setPageLoader(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <main className='h-[100vh] bg-cover bg-[url("/images/bg.jpg")] '>
        <div className='bg-black bg-opacity-50 h-[100vh]'>
          <section className='flex justify-between items-center px-5'>
            <Image className='no-drag svg-shadow'
              src='/icons/netflix-logo.svg'
              alt='Netflix Logo'
              priority
              style={{ width: '200px', height: '100px' }}
              width={200}
              height={100}
            />

            <div className='flex mr-4 space-x-2'>
              <button className='flex items-center justify-center gap-2 bg-[#b0343b] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#c74040]'
                onClick={() => handleSignIn('google')}
              >
                <AiFillGoogleCircle size={24} />
              </button>

              <button className='flex items-center justify-center gap-2 bg-[#333] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#555]'
                onClick={() => handleSignIn('github')}
              >
                <AiFillGithub size={24} />
              </button>
            </div>
          </section>

          <section className="h-[55vh] sm:h-[80vh] w-[90%] md:w-[80%] mx-[5%] md:mx-[10%] flex flex-col items-center justify-center text-white text-center">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl sm:px-[15%] md:px-[15%] lg:mx-14 lg:px-[7%] xl:px-[15%] font-medium">
                Unlimited movies, TV shows, and more..
              </h1>
              <h2 className="text-lg sm:text-1xl lg:text-2xl font-medium m-2 sm:m-4">
                Watch anywhere. Cancel anytime.
              </h2>

              <div className="flex-center flex-col space-y-3">
                <button className='flex items-center justify-center gap-2 bg-[#b0343b] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#c74040]'
                  onClick={() => handleSignIn('google')}
                >
                  <AiFillGoogleCircle size={24} />
                  <span>Sign in with Google</span>
                </button>

                <button className='flex items-center justify-center gap-2 bg-[#333] text-white text-[16px] font-medium px-4 py-2 rounded-md transition duration-[.4s] hover:bg-[#555]'
                  onClick={() => handleSignIn('github')}
                >
                  <AiFillGithub size={24} />
                  <span>Sign in with Github</span>
                </button>
              </div>
          </section>
        </div>
      </main>
    </motion.div>
  )
}
