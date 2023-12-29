'use client'

import { Order, OrderStatus } from "@prisma/client"
import axios from "axios"
import { Bike, ChefHat, UtensilsCrossed } from "lucide-react"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"

interface OrderStatusProps {
  orderId: string
}

const OrderStatusVisualizer: React.FC<OrderStatusProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>()

  useEffect(() => {
    const getOrder = async () => {
      const res = await axios(`/api/orders/${orderId}`)
      setOrder(res.data)
    }
    getOrder()
  }, [orderId])

  const handleClick = () => {
    localStorage.removeItem('orderId')
    window.location.reload()
  }

  let icon = <Skeleton className="w-32 h-32 rounded-md" />
  let title = 'Cargando...'

  if(order?.status === OrderStatus.IN_PROGRESS || order?.status === OrderStatus.PENDING) {
    icon = <ChefHat className="w-32 h-32" strokeWidth={1} />
    title = 'Tu orden está siendo preparada'
  }

  if(order?.status === OrderStatus.ON_THE_WAY) {
    icon = <Bike className="w-32 h-32" strokeWidth={1} />
    title = 'Tu orden está en camino'
  }

  if(order?.status === OrderStatus.READY || order?.status === OrderStatus.DONE) {
    icon = <UtensilsCrossed className="w-32 h-32" strokeWidth={1.2} />
    title = 'Tu orden está lista'
  }

  return (
    <div
      className="p-8 pt-0"
    >
      <div
        className="flex flex-col items-center justify-center"
      >
        <div
          // className="border-4 border-slate-200 rounded-full flex items-center justify-center p-10"
        >
          {icon}
        </div>
        <p className="text-center text-xl font-semibold">
          {title}
        </p>
      </div>
      {
        order?.status === OrderStatus.READY ||  order?.status === OrderStatus.DONE &&
        <div className="mt-8 flex items-center justify-center flex-col">
          <p className="text-center text-lg font-semibold">
            ¡Gracias por tu compra!
          </p>
          <p className="text-center text-lg font-semibold">
            ¡Que lo disfrutes!
          </p>
          <Button
            className="mt-4"
            onClick={handleClick}
          >
            Nueva orden
          </Button>
        </div>
      }
    </div>
  )
}

export default OrderStatusVisualizer