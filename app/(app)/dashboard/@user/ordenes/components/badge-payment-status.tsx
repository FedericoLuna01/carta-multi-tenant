import { Badge } from '@/components/ui/badge'
import { Order } from '@prisma/client'

const BADGE_CONFIG = {
  PENDING: {
    color: 'bg-yellow-300 hover:bg-yellow-400 text-black',
    label: 'Pendiente',
  },
  PAID: {
    color: 'bg-green-500 hover:bg-green-600 text-black',
    label: 'Pagado',
  },
}

const BadgePaymentStatus = ({ order }: { order: Order }) => {
  const config = BADGE_CONFIG[order.paymentStatus]
  return (
    <Badge
      className={config.color}
    >
      {config.label}
    </Badge>
  )
}

export default BadgePaymentStatus