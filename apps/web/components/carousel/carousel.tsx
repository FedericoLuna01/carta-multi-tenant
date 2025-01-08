"use client";

import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";

import Autoplay from "embla-carousel-autoplay";
import ProductCard from "../ui/product-card";
import { FullProduct, UserNoPass } from "@/types/types";

type PropType = {
  slides: FullProduct[];
  user?: UserNoPass
};

const Carousel: React.FC<PropType> = ({ slides, user }) => {
  const options: EmblaOptionsType = { loop: true };
  const autoPlayOptions = { delay: 3000, stopOnInteraction: false };
  const [emblaRef] = useEmblaCarousel(options, [Autoplay(autoPlayOptions)]);
  return (
    <section className="embla max-w-[calc(100vw-1rem)] md:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 my-4">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container ">
          {slides.map((product, index) => (
            <div className="embla__slide" key={index}>
              <ProductCard user={user} product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
