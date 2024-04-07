"use client";

import toast from "react-hot-toast";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useDeleteProductModal from "@/hooks/use-delete-product-modal";
import useCart from "@/hooks/use-cart";

const DeleteProductModal = () => {
  const cart = useCart();
  const { isOpen, onClose, data } = useDeleteProductModal();
  const [quantity, setQuantity] = useState(1);

  const handleChange = () => {
    if (isOpen) {
      return onClose();
    }
  };

  const handleRemove = () => {
    if (data) {
      cart.removeQuantity(data.id, quantity);
      setQuantity(1);
      return onClose();
    }
  };

  const handleChangeQuantity = (value: number) => {
    if (value <= 0) {
      return toast.error("La cantidad no puede ser menor a 1");
    }

    if (data) {
      if (value > data?.quantity) {
        return toast.error("La cantidad no puede ser mayor a la del producto");
      }
    }

    setQuantity(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">
            Eliminar producto
          </DialogTitle>
          <DialogDescription>
            Cuantos productos quieres eliminar?
            <br />
            Actualmente tenes {`${data?.quantity} ${data?.name}`} en tu carrito.
          </DialogDescription>
          <div className="flex items-center justify-center space-x-2 pt-4">
            <Button
              onClick={() => handleChangeQuantity(quantity - 1)}
              variant="outline"
            >
              -
            </Button>
            <Input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => handleChangeQuantity(Number(e.target.value))}
            />
            <Button
              onClick={() => handleChangeQuantity(quantity + 1)}
              variant="outline"
            >
              +
            </Button>
          </div>
          {data && (
            <div className="flex flex-row gap-4 pt-4">
              <Button
                onClick={handleChange}
                variant="secondary"
                className="w-1/2"
              >
                Cancelar
              </Button>
              <Button
                onClick={handleRemove}
                variant="destructive"
                className="w-1/2"
              >
                Eliminar
              </Button>
            </div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductModal;
