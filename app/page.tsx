import Carousel from '@/components/carousel/carousel'
import CartBar from '@/components/cart-bar'
import Header from '@/components/header'
import Main from '@/components/main'
import { products } from '@/data/data'

export default function Home() {
  return (
    <>
      <CartBar />
      <Header />
      <Carousel
        slides={products}
      />
      <Main />
    </>
  )
}
