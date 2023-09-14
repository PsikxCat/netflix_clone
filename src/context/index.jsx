'use client'

import { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { CircleLoader } from '@components'

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
  const [loggedInAccount, setLoggedInAccount] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [pageLoader, setPageLoader] = useState(true)
  const [trendingAllMedia, setTrendingAllMedia] = useState([])
  const [mediaData, setMediaData] = useState([])
  const [searchResult, setSearchResult] = useState([])

  useEffect(() => {
    setLoggedInAccount(sessionStorage.getItem('loggedInAccount'))
  }, [])

  // Se recupera la data de la sesión...
  const { data: session } = useSession()
  // para evitar que se renderice el componente antes de que se loguee el usuario
  if (session === undefined) return <CircleLoader />

  return (
    <GlobalContext.Provider
      value={{
        loggedInAccount,
        setLoggedInAccount,
        accounts,
        setAccounts,
        pageLoader,
        setPageLoader,
        trendingAllMedia,
        setTrendingAllMedia,
        mediaData,
        setMediaData,
        searchResult,
        setSearchResult
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
