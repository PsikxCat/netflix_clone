'use client'

import { useContext, useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import { GlobalContext } from '@context'
import { CircleLoader } from '@components'
import { AccountForm, PinContainer } from './'
import { getAccounts, deleteAccount } from '@utils/apiUtils'

export default function ManageAccounts() {
  const { accounts, setAccounts, pageLoader, setPageLoader } = useContext(GlobalContext)
  const { data: session } = useSession()
  const [formData, setFormData] = useState({ name: '', pin: '' })
  const [showAccountForm, setShowAccountForm] = useState(false)
  const [showDeleteIcons, setShowDeleteIcons] = useState(false)
  const [showPinContainer, setShowPinContainer] = useState({ show: false, accountId: '' })

  const handleGetAccounts = async () => {
    const data = await getAccounts(session)

    if (data && data.body.userAccounts) {
      setAccounts(data.body.userAccounts)
      setFormData({ name: '', pin: '' })
      setPageLoader(false)
    } else {
      setPageLoader(false)
    }
  }

  const handleDeleteAccount = async (accountId) => {
    const data = await deleteAccount(accountId)

    if (data && data.success) {
      handleGetAccounts()
      setShowDeleteIcons(false)
    }
  }

  const handleOpenPinContainer = (accountId) => {
    showDeleteIcons
      ? setShowDeleteIcons(false)
      : setShowPinContainer({ show: true, accountId })
  }

  const handleOpenAccountForm = () => {
    setShowAccountForm(true)
    setShowDeleteIcons(false)
  }

  useEffect(() => {
    handleGetAccounts()
  }, [])

  if (pageLoader) return <CircleLoader />

  return (
    <section className="min-h-screen flex-center flex-col relative bg-[#030609]">
      <div className="text-center flex-col">
        <h1 className="text-white font-bold text-[54px] my-[36px]">
          Who&apos;s Watching?
        </h1>

        <ul className='flex flex-center flex-wrap gap-8 p-0 my-[25px]'>
          {/* se renderiza por cada cuenta creada */}
          {accounts && accounts.map((account) => (
            <li className='flex flex-col items-center max-w-[200px] w-[155px] cursor-pointer'
              key={account._id}
            >
              <div className='relative'>
                <Image className='w-[130px] h-[130px] object-cover rounded-full bg-[#E5B109]'
                  onClick={() => handleOpenPinContainer(account._id)}
                  src={account.avatar}
                  alt={account.name}
                  width={130}
                  height={130}
                />

                {showDeleteIcons && (
                  <span className='absolute top-0 right-0 w-[36px] h-[36px] rounded-full bg-red-500 flex-center cursor-pointer'
                    onClick={() => handleDeleteAccount(account._id)}
                  >
                    <TrashIcon className='text-white w-[20px] h-[20px]' />
                  </span>
                )}
              </div>

              <p className='text-white font-bold text-[20px] mt-[15px] mb-4'>
                {account.name}
              </p>
            </li>
          ))}

          {/* se renderiza si hay menos de cuatro cuentas creadas */}
          {accounts && accounts.length < 4 && (
            <li className='flex flex-col items-center max-w-[200px] w-[155px] cursor-pointer'
              onClick={handleOpenAccountForm}
            >
              <div className='flex-center w-[130px] h-[130px] rounded-full bg-red-500'>
                <PlusIcon className='text-white w-[50px] h-[50px]' />
              </div>

              <p className='text-white font-bold text-[20px] mt-[15px] mb-4'>
                Add Account
              </p>
            </li>
          )}
        </ul>

        <div className='text-center' onClick={() => setShowDeleteIcons(!showDeleteIcons)}>
            <span className='border border-gray-100 rounded-md cursor-pointer tracking-wide inline-flex text-sm px-[1.5em] py-[0.5em]'>
              Manage Accounts
            </span>
        </div>

        <button className='px-4 py-1 mt-8 bg-red-700 border outline-none rounded-md text-white' onClick={() => signOut()}>
          Sign Out
        </button>

        {showAccountForm && (
          <AccountForm
            setShowAccountForm={setShowAccountForm}
            formData={formData}
            setFormData={setFormData}
            handleGetAccounts={handleGetAccounts}
          />
        )}

        {showPinContainer.show && (
          <PinContainer
            showPinContainer={showPinContainer}
            setShowPinContainer={setShowPinContainer}
          />
        )}
      </div>
    </section>
  )
}
