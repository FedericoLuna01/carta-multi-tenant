'use client'

import Image from "next/image"

import useProductModal from "@/hooks/use-product-modal"
import { formatter } from "@/lib/utils"
import { Button } from "./button"
import { type Product } from "@prisma/client"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  product: Product
  isAdmin?: boolean
}

const ProductCard: React.FC<ProductCardProps> = ({ product, isAdmin = false }) => {
  const productModal = useProductModal()

  return (
    <article
      className="w-auto lg:w-full h-full "
    >
      <div
        className="flex flex-col justify-between lg:grid lg:grid-cols-[250px,1fr,150px] bg-slate-100 rounded-md p-1 my-2 max-w-fit lg:max-w-full h-full mx-auto lg:mx-0"
      >
        <div
          className="col-span-2 flex flex-col lg:flex-row group cursor-pointer"
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
              <p
                className="max-w-[250px] lg:max-w-full"
              >
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
          {
            isAdmin ? (
              <div
                className="flex flex-col gap-2"
              >
                <Button
                  asChild
                  className=""
                >
                  <Link
                    href={`/admin/productos/${product.id}`}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                      Editar
                  </Link>
                </Button>
                <Button
                  variant='destructive'
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => productModal.onOpen(product)}
                size='lg'
              >
              Agregar
              </Button>
            )
          }
        </div>
      </div>
    </article>
  )
}

export default ProductCard