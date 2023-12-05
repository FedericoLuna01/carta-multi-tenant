'use client'

import useEmblaCarousel, {
  EmblaOptionsType,
} from 'embla-carousel-react'

import Autoplay from 'embla-carousel-autoplay'
import { Product } from '@/types/types'
import ProductCard from '../ui/product-card'

type PropType = {
  slides: Product[]
}

const Carousel: React.FC<PropType> = ({ slides }) => {
  const options: EmblaOptionsType = { loop: true }
  const autoPlayOptions = { delay: 3000, stopOnInteraction: false }
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoPlayOptions)])
  return (
    <section className="embla my-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {
            slides.map((product, index) => (
              <div className="embla__slide" key={index}>
                <ProductCard
                  product={product}
                />
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Carousel
