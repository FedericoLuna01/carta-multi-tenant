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
import { UserSettings } from "@prisma/client"

const CartModal = ({ userSettings }: { userSettings: UserSettings | null}) => {
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    setOrderId(localStorage.getItem('orderId'))
  }, [orderId])

  const title = orderId ? `Estado de tu orden - #${orderId}` : 'Resumen de tu orden'
  const description = orderId ? 'Mira el progreso de tu orden. ¡Ya casi está listo!' : 'Mira que bien queda tu orden, ¿quieres cambiar algo?'

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button >
          <ShoppingCart className="mr-2" />
          Mi orden
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen sm:max-w-[500px] md:max-w-[700px] xl:max-w-[800px] max-h-[95vh] overflow-y-auto p-0">
        <DialogHeader
          className="sticky z-50 px-8 top-0 bg-white py-4 translate-y-[-2px] border-b border-b-slate-200"
        >
          <DialogTitle
            className="text-2xl"
          >
            {title}
          </DialogTitle>
          <DialogClose className="absolute top-3 right-5" asChild>
            <Button asChild size='icon' type="button" variant='ghost'>
              <X className="w-5 h-5" />
            </Button>
          </DialogClose>
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
            <CartForm
              userSettings={userSettings}
            />
        }
      </DialogContent>
    </Dialog>
  )
}

export default CartModal