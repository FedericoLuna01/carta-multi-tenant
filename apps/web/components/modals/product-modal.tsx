"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import AddProductForm from "../forms/add-product-form";
import useProductModal from "@/hooks/use-product-modal";
import { FullProduct } from "@/types/types";
import { cn, formatter } from "@/lib/utils";

const ProductModal = () => {
  const { data, onClose, isOpen, user } = useProductModal();

  const handleChange = () => {
    if (isOpen) {
      return onClose();
    }
  };

  if (!data) return null;
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <Image
            src={data.image}
            alt={data.name}
            width={680}
            height={150}
            className="rounded-md mt-5 aspect-[16/10] object-cover"
          />
          <DialogTitle className="text-2xl font-bold text-black">
            {data.name}
          </DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
          <div>
            {
              user.isPremium ? (
                <AddProductForm data={data} />
              ) : (
                <ModalProductDetails data={data} />
              )
            }
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;

// TODO: Mover a otro lado
const ModalProductDetails = ({ data }: { data: FullProduct }) => {
  return (
    <div>
      {
        data.sizes && (
          <div>
            <p className="text-black font-semibold">Tamaños</p>
            {
              data.sizes.map((size) => (
                <div key={size.name}>
                  <p className="">
                    {size.name} - {formatter.format(size.price)}
                  </p>
                </div>
              ))
            }
          </div>
        )
      }
      {
        data.extras && (
          <div>
            <p className="text-black font-semibold">Extras</p>
            {
              data.extras.map((extra) => (
                <div key={extra.name}>
                  <p className="">
                    {extra.name} - {formatter.format(extra.price)}
                  </p>
                </div>
              ))
            }
          </div>
        )
      }
      {
        data.sizes.length === 2 && (
          <div className="flex gap-2 mt-2">
            <p className={cn("font-bold text-xl", data.isPromo && "text-gray-500 line-through")}>
              {formatter.format(data.price)}
            </p>
            {
              data.isPromo && (
                <p className="font-bold text-xl text-green-600">
                  {formatter.format(data.promoPrice as number)}
                </p>
              )
            }
          </div>
        )
      }
    </div>
  )
}