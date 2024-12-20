import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { OrderStatus } from '@prisma/client'

const BADGE_CONFIG = {
  PENDING: {
    color: 'bg-yellow-200 hover:bg-yellow-300 border-yellow-400',
    label: 'Pendiente',
  },
  IN_PROGRESS: {
    color: 'bg-orange-200 hover:bg-orange-300 border-orange-400',
    label: 'En progreso',
  },
  ON_THE_WAY: {
    color: 'bg-blue-200 hover:bg-blue-300 border-blue-400',
    label: 'En camino',
  },
  READY: {
    color: 'bg-emerald-200 hover:bg-emerald-300 border-emerald-400',
    label: 'Listo',
  },
  DONE: {
    color: 'bg-green-200 hover:bg-green-300 border-green-400',
    label: 'Entregado',
  },
  CANCELED: {
    color: 'bg-red-200 hover:bg-red-300 border-red-400',
    label: 'Cancelado',
  },
}

const BadgeOrderStatus = ({ orderStatus }: { orderStatus: OrderStatus }) => {
  const config = BADGE_CONFIG[orderStatus]
  return (
    <Badge
      className={cn("text-black", config.color)}
    >
      {config.label}
    </Badge>
  )
}

export default BadgeOrderStatus