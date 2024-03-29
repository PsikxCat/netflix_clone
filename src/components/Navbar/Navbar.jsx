'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { AiOutlineMenu, AiOutlineSearch } from 'react-icons/ai'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import { Search, AccountMenu } from './'
import { GlobalContext } from '@context'
import { MoreInfoPopup } from '@components'

export default function Navbar() {
  const router = useRouter()
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAccountMenu, setShowAccountMenu] = useState(false)
  const {
    setPageLoader,
    setLoggedInAccount,
    showCardModal,
    setShowCardModal,
    loggedInAccount
  } = useContext(GlobalContext)

  const menuItems = [
    { id: 'home', label: 'Home', href: '/browse' },
    { id: 'tv', label: 'TV Shows', href: '/tv' },
    { id: 'movies', label: 'Movies', href: '/movies' },
    {
      id: 'my-list',
      label: 'My List',
      href: `/my-list/${session?.user?.uid}/${loggedInAccount.id}`
    },
  ]

  const handleRouted = (href) => {
    if (pathname === href) return

    setPageLoader(true)
    router.push(href)
    setSearchQuery('')
    setShowSearchBar(false)
  }

  // Actualizar el estado de isScrolled cuando el usuario haga scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true)
      else setIsScrolled(false)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className='relative'>
      <header className={`header ${(isScrolled || showMenu) && 'bg-[#141414]'} hover:bg-[#141414]`}>
        <div className='flex items-center space-x-2 md:space-x-10'>
          <Image className='cursor-pointer no-drag svg-shadow'
            src='/icons/netflix-logo.svg'
            alt='Netflix Logo'
            priority
            style={{ width: '120px', height: '60px' }}
            width={120}
            height={60}
            onClick={() => router.push('/browse')}
          />

          <div className='md:hidden flex items-center space-x-2 px-6'>
            <button className='text-[#E5E5E5] hover:text-[#e5b209c0] focus:outline-none'
              onClick={() => setShowMenu(!showMenu)}
            >
              <AiOutlineMenu className='sm:h-6 sm:w-6 sm:mr-[9px] cursor-pointer svg-shadow'
                size={24} />
            </button>
          </div>

          <AnimatePresence>
            {showMenu && (
              <motion.div className='absolute top-16 left-[-10px] w-[50vw] z-10'
                initial={{ opacity: 0, scale: 0.5, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: -100 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <div className='md:hidden bg-[#141414] rounded-md'>
                  <ul className='space-y-8 flex-center flex-col p-10'>
                    {menuItems.map((item) => (
                      <li
                        className={`cursor-pointer text-[16px] text-shadow font-medium transition duration-[.4s] hover:text-[#e5b209c0] ${
                          pathname === item.href ? 'text-red-600' : 'text-[#E5E5E5]'
                        }`}
                        key={item.id}
                        onClick={() => handleRouted(item.href)}
                      >
                        {item.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ul className='hidden md:flex md:space-x-4 '>
            {menuItems.map((item) => (
              <li className={`cursor-pointer text-[16px] text-shadow font-medium transition duration-[.4s] hover:text-[#e5b209c0] ${pathname === item.href ? 'text-red-600' : 'text-[#E5E5E5]'}`}
                key={item.id}
                onClick={() => handleRouted(item.href)}
              >
                  {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center space-x-2 font-light text-sm'>
          {showSearchBar
            ? (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                <Search
                  router={router}
                  setShowSearchBar={setShowSearchBar}
                  setPageLoader={setPageLoader}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              </motion.div>
              )
            : (
              <AiOutlineSearch className='hidden sm:inline sm:h-6 sm:w-6 sm:mr-[9px] cursor-pointer svg-shadow'
                size={24}
                onClick={() => setShowSearchBar(true)} />
              )
            }

            <div className='flex-center gap-2 cursor-pointer'
              onClick={() => setShowAccountMenu(!showAccountMenu)}
            >
              <Image className='rounded-full object-cover bg-gray-950 no-drag'
                src={loggedInAccount?.avatar}
                alt='Avatar'
                width={36}
                height={36}
              />
            </div>
        </div>
      </header>

      <AnimatePresence>
        {showAccountMenu &&
          <motion.div className="flex items-end flex-col fixed top-[55px] right-[12px] z-50 rounded-md bg-black bg-opacity-90 p-4 space-y-5"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
          >
            <AccountMenu
              setShowAccountMenu={setShowAccountMenu}
              setLoggedInAccount={setLoggedInAccount}
              setPageLoader={setPageLoader}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </motion.div>
        }
      </AnimatePresence>

      <MoreInfoPopup show={showCardModal} setShow={setShowCardModal} />
    </nav>
  )
}
