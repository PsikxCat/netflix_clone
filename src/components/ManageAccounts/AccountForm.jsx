'use client'

import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

import { createAccount } from '@utils/apiUtils'

export default function AccountForm({ setShowAccountForm, formData, setFormData, handleGetAccounts }) {
  const { data: session } = useSession()

  const handleSaveAccount = async (e) => {
    e.preventDefault()

    const data = await createAccount(formData, session?.user?.uid)

    if (data && data.success) {
      handleGetAccounts()
      setShowAccountForm(false)
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
            onClick={() => setShowAccountForm(false)}
            >
            <XMarkIcon className='h-8 w-8'/>
          </span>

          <form className='flex-center flex-col gap-5'
            onSubmit={(e) => handleSaveAccount(e)}
          >
            <input className='px-5 py-3 rounded-lg bg-[#141414] text-lg text-[#E5B109] outline-none placeholder:text-red-700 focus:outline-none'
              name='name'
              value={formData.name}
              placeholder='Enter your name'
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <input className='px-5 py-3 rounded-lg bg-[#141414] text-lg text-[#E5B109] outline-none placeholder:text-red-700 focus:outline-none'
              type='password'
              name='pin'
              value={formData.pin}
              maxLength={4}
              placeholder='Enter your PIN'
              onChange={(e) => setFormData({ ...formData, pin: e.target.value })}
            />

            <button className='w-3/4 h-12 flex-center p-4 bg-[#E5B109] border outline-none rounded-lg text-white text-lg font-bold'
              type='submit'
              onClick={(e) => handleSaveAccount(e)}
            >
              Save
            </button>
          </form>
        </section>
      </motion.div>
    </div>
  )
}
