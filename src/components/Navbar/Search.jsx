'use client'

import { AiOutlineSearch } from 'react-icons/ai'

export default function Search({
  router, setShowSearchBar, setPageLoader, searchQuery, setSearchQuery
}) {
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setShowSearchBar(false)
      return
    }

    router.push(`/search/${searchQuery.trim()}`)
    setPageLoader(true)
    setShowSearchBar(false)
  }

  return (
    <div className='hidden sm:flex-center text-center'>
      <form className='relative' onSubmit={handleSearch}>
        <input className='bg-[#333] text-[#E5E5E5] rounded-md w-[230px] h-[40px] px-4'
          type='text'
          placeholder='Search for a title'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className='absolute top-0 right-0 h-full w-[40px] bg-red-600 rounded-r-md flex items-center justify-center'
        >
          <AiOutlineSearch size={24} color='#000' />
        </button>
      </form>
    </div>
  )
}
