'use client'

import Image from "next/image"

import useProductModal from "@/hooks/use-product-modal"
import { formatter } from "@/lib/utils"
import { Button } from "./button"
import { type Product } from "@prisma/client"

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productModal = useProductModal()

  return (
    <article>
      <div
        className="grid grid-cols-[250px,1fr,150px] bg-slate-100 rounded-md p-1  my-2"
      >
        <div
          className="col-span-2 flex flex-row group cursor-pointer"
          onClick={() => productModal.onOpen(product)}
        >
          <Image
            src={product.image}
            alt="food"
            width={320}
            height={150}
            className="aspect-[16/10]  rounded-md group-hover:filter group-hover:brightness-90 transition-all duration-100"
          />
          <div
            className="flex flex-col text-left px-6 justify-between py-6 "
          >
            <div>
              <h3
                className="font-bold text-xl group-hover:underline "
              >
                {product.name}
              </h3>
              <p>
                {product.description}
              </p>
            </div>
            <div
              className="flex items-center gap-2"
            >
              <p
                className={`font-semibold text-[1rem] ${product.isPromo ? 'text-gray-400 line-through' : 'text-slate-800'}`}
              >
                {formatter.format(product.price)}
              </p>
              {
                product.isPromo && (
                  <p
                    className="font-semibold text-[1rem] text-green-600"
                  >
                    {formatter.format(product.price)}
                  </p>
                )
              }
            </div>
          </div>
        </div>
        <div
          className="place-self-end p-4"
        >
          <Button
            onClick={() => productModal.onOpen(product)}
            size='lg'
          >
            Agregar
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard