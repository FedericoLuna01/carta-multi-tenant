import { cn } from "@/lib/utils"
import { Order, OrderStatus } from "@prisma/client"

const BadgeOrderStatus = ({ order }: { order: Order }) => {
  const status = Object.values(OrderStatus).map(v => {
    if (v === 'PENDING') return { value: v, label: 'Pendiente' }
    if (v === 'IN_PROGRESS') return { value: v, label: 'En progreso' }
    if (v === 'ON_THE_WAY') return { value: v, label: 'En camino' }
    if (v === 'READY') return { value: v, label: 'Listo' }
    if (v === 'DONE') return { value: v, label: 'Entregado' }
    if (v === 'CANCELED') return { value: v, label: 'Cancelado' }
  })
  return (
    <div>
      <p
        className={cn('font-semibold text-center py-1 px-2 rounded-md border-2', {
          'bg-yellow-200 border-yellow-400': order.status === 'PENDING',
          'bg-orange-200 border-orange-400': order.status === 'IN_PROGRESS',
          'bg-blue-200 border-blue-400': order.status === 'ON_THE_WAY',
          'bg-emerald-200 border-emerald-400': order.status === 'READY',
          'bg-green-300 border-green-400': order.status === 'DONE',
          'bg-red-200 border-red-400': order.status === 'CANCELED',
        })}
      >
        {
          status.find(s => s.value === order.status)?.label
        }
      </p>
    </div>
  )
}

export default BadgeOrderStatus