import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OrderType } from "@prisma/client";

const BADGE_CONFIG = {
  DELIVERY: {
    color: "bg-cyan-200 hover:bg-cyan-300 border-cyan-400",
    label: "Delivery",
  },
  TAKEAWAY: {
    color: "bg-purple-200 hover:bg-purple-300 border-purple-400",
    label: "Retiro",
  },
  TABLE: {
    color: "bg-blue-200 hover:bg-blue-300 border-blue-400",
    label: "Mesa",
  },
}

const BadgeOrderType = ({ type }: { type: OrderType }) => {
  const config = BADGE_CONFIG[type];
  return (
    <Badge
      className={cn("text-black", config.color)}
    >
      {config.label}
    </Badge>
  );
};

export default BadgeOrderType;
