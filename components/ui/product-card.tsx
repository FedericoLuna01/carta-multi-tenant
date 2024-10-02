"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";

import useProductModal from "@/hooks/use-product-modal";
import { formatter } from "@/lib/utils";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { FullProduct } from "@/types/types";

interface ProductCardProps {
  product: FullProduct;
  isAdmin?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isAdmin = false,
}) => {
  const productModal = useProductModal();

  return (
    <Card
      className="p-1 bg-slate-100 flex flex-col lg:flex-row h-full w-auto lg:w-full group hover:cursor-pointer mx-auto lg:mx-0 relative overflow-hidden"
      onClick={() => productModal.onOpen(product)}
    >
      {product.isPromo && (
        <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-12 py-2 translate-y-1 translate-x-8 rotate-[30deg] z-10 font-semibold">
          Promo
        </div>
      )}
      <div className="h-[210px] w-auto lg:w-1/3 flex-shrink-0 relative">
        <Image
          src={product.image}
          alt={`${product.name} image`}
          fill
          className="aspect-[16/10] object-cover rounded-md group-hover:filter group-hover:brightness-90 transition-all duration-100"
          blurDataURL={product.image}
          placeholder="blur"
        />
      </div>
      <div className="w-full flex flex-col justify-between h-full lg:h-auto">
        <CardHeader>
          <CardTitle className="group-hover:underline">
            {product.name}
          </CardTitle>
          <CardDescription className="max-w-[250px] lg:max-w-[450px]">
            {product.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-between items-center space-x-12">
          <div className="flex flex-col lg:flex-row items-center gap-2 ">
            <p
              className={`font-semibold text-[1rem] ${product.isPromo
                  ? "text-gray-500 line-through"
                  : "text-slate-800"
                }`}
            >
              {formatter.format(product.price)}
            </p>
            {product.isPromo && (
              <p className="font-semibold text-[1rem] text-green-600">
                {formatter.format(product.promoPrice as number)}
              </p>
            )}
          </div>
          <div>
            {isAdmin ? (
              <div className="flex flex-col gap-2">
                <Button asChild className="">
                  <Link
                    href={`/dashboard/productos/${product.id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar
                  </Link>
                </Button>
              </div>
            ) : (
              <Button onClick={() => productModal.onOpen(product)} size="lg">
                Agregar
              </Button>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ProductCard;
