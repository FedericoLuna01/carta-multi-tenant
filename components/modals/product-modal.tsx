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

const ProductModal = () => {
  const { data, onClose, isOpen } = useProductModal();

  const handleChange = () => {
    if (isOpen) {
      return onClose();
    }
  };

  if (!data) return null;

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
            <AddProductForm data={data} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
