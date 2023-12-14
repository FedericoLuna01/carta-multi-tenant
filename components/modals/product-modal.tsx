'use client'

import Image from "next/image"

import useProductModal from "@/hooks/use-product-modal"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import AddProductForm from "../forms/add-product-form"

const ProductModal = () => {
  const { data, onClose, isOpen } = useProductModal()

  const handleChange = () => {
    if(isOpen) {
      return onClose()
    }
  }

  if (!data) return null

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleChange}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Image
            src={data?.image}
            alt={data?.name}
            width={680}
            height={150}
            className="rounded-md mt-5"
          />
          <DialogTitle
            className="text-2xl font-bold text-black"
          >
            {data?.name}
          </DialogTitle>
          <DialogDescription>
            {data?.description}
          </DialogDescription>
          <div>
            <AddProductForm
              data={data}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal