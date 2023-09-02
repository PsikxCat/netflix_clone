import { Inter } from 'next/font/google'

import '@styles/globals.css'
import GlobalState from '@context'
import NextAuthProvider from '@authProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Netflix Clone',
  description: 'This is a clone of Netflix made with Next.js by @psiko_cat',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <GlobalState>
            {children}
          </GlobalState>
        </NextAuthProvider>
      </body>
    </html>
  )
}
