import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Order } from '@prisma/client'

const BADGE_CONFIG = {
  CASH: {
    color: 'bg-green-400 hover:bg-green-500 border-green-600',
    label: 'Efectivo',
  },
  CARD: {
    color: 'bg-blue-400 hover:bg-blue-500 border-blue-600',
    label: 'Tarjeta',
  },
  TRANSFER: {
    color: 'bg-violet-400 hover:bg-violet-500 border-violet-600',
    label: 'Transferencia',
  },
  QR: {
    color: 'bg-zinc-300 hover:bg-zinc-400 border-zinc-600',
    label: 'QR',
  }
}

const BadgePaymentType = ({ order }: { order: Order }) => {
  const config = BADGE_CONFIG[order.payment]
  return (
    <Badge
      className={cn("text-black", config.color)}
    >
      {config.label}
    </Badge>
  )
}

export default BadgePaymentType