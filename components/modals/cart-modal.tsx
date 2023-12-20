'use client'

import { ShoppingCart, X } from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import CartForm from "../forms/cart-form"
import OrderStatusVisualizer from "../order-status"

const CartModal = () => {
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    setOrderId(localStorage.getItem('orderId'))
    console.log(orderId)
  }, [orderId])

  const title = orderId ? 'Estado de tu orden' : 'Resumen de tu orden'
  const description = orderId ? 'Mira el progreso de tu orden. ¡Ya casi está listo!' : 'Mira que bien queda tu orden, ¿quieres cambiar algo?'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >
          <ShoppingCart className="mr-2" />
          Mi orden
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] md:max-w-[600px] xl:max-w-[800px] max-h-[95vh] overflow-y-auto pt-0 p-0">
        <DialogHeader
          className="sticky z-50 px-8 top-0 bg-white py-4 translate-y-[-2px] border-b border-b-slate-200"
        >
          <div
            className="flex items-center justify-between"
          >
            <DialogTitle
              className="text-2xl"
            >
              {title}
            </DialogTitle>
            <DialogClose asChild>
              <Button asChild size='icon' type="button" variant='ghost'>
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {
          orderId ?
            <OrderStatusVisualizer
              orderId={orderId}
            />
            :
            <CartForm />
        }
      </DialogContent>
    </Dialog>
  )
}

export default CartModal