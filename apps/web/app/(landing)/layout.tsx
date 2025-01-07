import { Inter } from "next/font/google"
import "../globals.css"
import Navbar from "./_components/navbar"
import Footer from "./_components/footer"

export const metadata = {
  title: 'Plato Menu',
  description: 'Administra tu restaurante de manera fácil y rápida con Plato Menu.',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} grid grid-rows-[80px,1fr,auto] min-h-screen`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
