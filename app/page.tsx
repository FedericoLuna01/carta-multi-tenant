import Carousel from '@/components/carousel/carousel'
import Navbar from '@/components/navbar'
import Header from '@/components/header'
import Main from '@/components/main'
import UserInfo from '@/components/user-info'
import prismadb from '@/lib/prismadb'

export default async function Home() {
  const products = await prismadb.product.findMany({
    where: {
      isPromo: true
    },
    include: {
      sizes: true,
      extras: true
    }
  })

  const userSettings = await prismadb.userSettings.findFirst()

  return (
    <>
      <Navbar
        userSettings={userSettings}
      />
      <main
        className='mt-24'
      >
        <Header />
        <UserInfo
          userSettings={userSettings}
        />
        {
          products.length > 0 &&
          <Carousel
            slides={products}
          />
        }
        <Main />
      </main>
    </>
  )
}
