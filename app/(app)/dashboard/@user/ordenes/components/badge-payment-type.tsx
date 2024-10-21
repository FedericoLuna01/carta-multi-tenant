import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Order } from '@prisma/client'

const BADGE_CONFIG = {
  CASH: {
    color: 'bg-green-500 hover:bg-green-600',
    label: 'Efectivo',
  },
  CARD: {
    color: 'bg-blue-400 hover:bg-blue-500',
    label: 'Tarjeta',
  },
  TRANSFER: {
    color: 'bg-violet-400 hover:bg-violet-500',
    label: 'Transferencia',
  },
  QR: {
    color: 'bg-zinc-300 hover:bg-zinc-400',
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