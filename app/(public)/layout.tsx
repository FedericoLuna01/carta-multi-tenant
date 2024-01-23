import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

import { ToasterProvider } from '@/providers/toaster-provider'
import ModalsProviders from '@/providers/modals-provider'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Carta - Demo',
  description: 'Demo de carta digital. Una web donde podrás administrar tu carta y tus pedidos.',
  icons: {
    icon: '/favicon.ico',
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSettings = await prismadb.userSettings.findFirst()

  return (
    <html lang="es">
      <body className={`${inter.className} grid min-h-screen grid-rows-[80px,1fr,60px] `}
        style={{
          backgroundImage: 'url(./background.webp)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <ToasterProvider />
        <ModalsProviders />
        <Navbar
          userSettings={userSettings}
        />
        <div />
        <main
          className='h-full'
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
