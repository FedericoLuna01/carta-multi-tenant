import Carousel from '@/components/carousel/carousel'
import CartBar from '@/components/cart-bar'
import Header from '@/components/header'
import Main from '@/components/main'
// import { products } from '@/data/data'
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

  return (
    <>
      <CartBar />
      <div
        className={`mt-24 ${products.length > 0 ? '0' : 'mb-10'}`}
      >
        <Header />
      </div>
      {
        products.length > 0 &&
        <Carousel
          slides={products}
        />
      }
      <Main />
    </>
  )
}
