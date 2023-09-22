import { useContext, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import PinInput from 'react-pin-input'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { GlobalContext } from '@context'
import { loginAccount } from '@utils/apiUtils'

export default function PinContainer({ showPinContainer, setShowPinContainer }) {
  const { setLoggedInAccount, setPageLoader } = useContext(GlobalContext)
  const pathname = usePathname()
  const router = useRouter()
  const [pinError, setPinError] = useState(false)

  const handleClosePinContainer = () => {
    setShowPinContainer({ show: false, accountId: '' })
    setPinError(false)
  }

  const handlePinSubmit = async (inputPin) => {
    const data = await loginAccount(showPinContainer.account.id, inputPin)

    if (data && !data.success && data.message === 'Invalid pin') setPinError(true)
    else if (data && data.success) {
      setPageLoader(true)

      setLoggedInAccount(showPinContainer.account)
      sessionStorage.setItem('loggedInAccount', JSON.stringify(showPinContainer.account))
      router.push(pathname)

      setPageLoader(false)
    } else {
      setPinError(true)
      setPageLoader(false)
    }
  }

  return (
    <div className='fixed inset-0 flex-center z-50 bg-black bg-opacity-70'>
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <section className='flex-center flex-col px-8 h-[300px] bg-black border border-red-700 rounded-lg relative'>
          <span className='cursor-pointer absolute right-0 top-0 p-2'
            onClick={handleClosePinContainer}
            >
            <XMarkIcon className='h-8 w-8'/>
          </span>

          <h1 className='text-white font-bold text-[30px] mb-4'>
            Enter your PIN
          </h1>

          {pinError
            ? (
            <p className='text-[#E5B109] text-[24px] mb-4'>
              Whoops, that&apos;s not the right PIN. Try again.
            </p>
              )
            : (
            <p className='text-white text-[24px] mb-4'>
              Enter your PIN to access your account
            </p>
              )}

            <PinInput
              initialValue={''}
              type='numeric'
              inputMode='number'
              length={4}
              secret
              secretDelay={200}
              style={{ display: 'flex', gap: '10px', padding: '20px' }}
              inputStyle={{ borderColor: 'white', borderRadius: '4px', height: '70px', width: '70px', fontSize: '40px', backgroundColor: '#eee', color: 'black', fontWeight: 'bold' }}
              onComplete={(inputPin) => handlePinSubmit(inputPin)}
              autoSelect
              focus
            />
        </section>
      </motion.div>
    </div>

  )
}
