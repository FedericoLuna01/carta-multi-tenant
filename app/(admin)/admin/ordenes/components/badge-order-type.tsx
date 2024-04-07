import { cn } from "@/lib/utils";
import { OrderType } from "@prisma/client";

interface BadgeOrderTypeProps {
  type: OrderType;
}

const BadgeOrderType: React.FC<BadgeOrderTypeProps> = ({ type }) => {
  const label =
    type === "DELIVERY" ? "Delivery" : type === "TAKEAWAY" ? "Retiro" : "Mesa";
  return (
    <div
      className={cn(
        "font-semibold text-center py-1 px-2 rounded-md border-2 w-fit",
        {
          "bg-cyan-200 border-cyan-400": type === "DELIVERY",
          "bg-purple-200 border-purple-400": type === "TAKEAWAY",
          "bg-blue-200 border-blue-400": type === "TABLE",
        }
      )}
    >
      <p>{label}</p>
    </div>
  );
};

export default BadgeOrderType;
