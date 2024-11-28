import { Badge } from '@/components/ui/badge'
import { OrderPaymentStatus } from '@prisma/client'

const BADGE_CONFIG = {
  PENDING: {
    color: 'bg-yellow-200 hover:bg-yellow-300 border-yellow-400 text-black',
    label: 'Pendiente',
  },
  PAID: {
    color: 'bg-green-400 hover:bg-green-500 border-green-600 text-black',
    label: 'Pagado',
  },
}

const BadgePaymentStatus = ({ orderPaymentStatus }: { orderPaymentStatus: OrderPaymentStatus }) => {
  const config = BADGE_CONFIG[orderPaymentStatus]
  return (
    <Badge
      className={config.color}
    >
      {config.label}
    </Badge>
  )
}

export default BadgePaymentStatus