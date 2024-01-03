import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../../globals.css'

import AdminNavbar from "@/components/admin-navbar"
import Footer from '@/components/footer'
import { ToasterProvider } from '@/providers/toaster-provider'
import ModalsProviders from '@/providers/modals-provider'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'Carta - Admin',
  description: 'En esta sección podrás administrar tu carta.',
}

const AdminLayout = ({ children }: { children: React.ReactNode}) => {
  return (
    <html lang="es">
      <body
        className={`${inter.className} grid min-h-screen grid-rows-[60px,1fr,60px] `}
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
        <div />
        <AdminNavbar />
        <main
          className="backdrop-blur-sm pt-4"
        >
          <div
            className="container"
          >
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default AdminLayout