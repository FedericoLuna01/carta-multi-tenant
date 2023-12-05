'use client'

import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CartForm from "../forms/cart-form"

const CartModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >
          <ShoppingCart className="mr-2" />
          Mi pedido
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px] xl:max-w-[800px]">
        <DialogHeader>
          <DialogTitle
            className="text-2xl"
          >
            Resumen de tu pedido
          </DialogTitle>
          <DialogDescription>
            Mira que bien te queda el pedido, ¿quieres cambiar algo?
          </DialogDescription>
          <CartForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default CartModal