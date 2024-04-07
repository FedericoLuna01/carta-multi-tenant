"use client";

import { Order, OrderStatus } from "@prisma/client";
import axios from "axios";
import {
  AlertCircle,
  Bike,
  ChefHat,
  UtensilsCrossed,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Spinner from "./ui/spinner";

interface OrderStatusProps {
  orderId: string;
}

const OrderStatusVisualizer: React.FC<OrderStatusProps> = ({ orderId }) => {
  const [order, setOrder] = useState<Order | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);
      const res = await axios(`/api/orders/${orderId}`);
      setOrder(res.data);
      setLoading(false);
    };
    getOrder();
  }, [orderId]);

  const handleClick = () => {
    localStorage.removeItem("orderId");
    window.location.reload();
  };

  let icon = <Spinner />;
  let title = "Cargando...";
  let description = "";
  let button = false;

  if (loading) {
    return (
      <div className="p-8 pt-0">
        <div className="flex flex-col items-center justify-center">
          {icon}
          <p className="text-center text-xl font-semibold">{title}</p>
          <p className="text-center text-gray-500 mt-2 max-w-sm">
            {description}
          </p>
        </div>
      </div>
    );
  }

  if (!order && !loading) {
    icon = <AlertCircle className="w-32 h-32" strokeWidth={1.2} />;
    title = "No se encontró su orden";
    description = "Hubo un error con su compra. Por favor, intente de nuevo.";
    return (
      <div className="p-8 pt-0">
        <div className="flex flex-col items-center justify-center">
          {icon}
          <p className="text-center text-xl font-semibold">{title}</p>
          <p className="text-center text-gray-500 mt-2 max-w-sm">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button className="mt-4" onClick={handleClick}>
            Nueva orden
          </Button>
        </div>
      </div>
    );
  }

  if (
    order?.status === OrderStatus.IN_PROGRESS ||
    order?.status === OrderStatus.PENDING
  ) {
    icon = <ChefHat className="w-32 h-32" strokeWidth={1} />;
    title = "Tu orden está siendo preparada";
    description = "Gracias por su compra! Te avisaremos cuando esté lista.";
  }

  if (order?.status === OrderStatus.ON_THE_WAY) {
    icon = <Bike className="w-32 h-32" strokeWidth={1} />;
    title = "Tu orden está en camino";
    description = "Gracias por su compra! Ya casi está por llegar.";
  }

  if (order?.status === OrderStatus.PAID) {
    icon = <Wallet className="w-32 h-32" strokeWidth={1} />;
    title = "Tu orden está pagada";
    description = "Gracias por su compra! Te avisaremos cuando esté lista.";
  }

  if (
    order?.status === OrderStatus.READY ||
    order?.status === OrderStatus.DONE
  ) {
    icon = <UtensilsCrossed className="w-32 h-32" strokeWidth={1.2} />;
    title = "Tu orden está lista";
    description = "Gracias por su compra!";
    button = true;
  }

  if (order?.status === OrderStatus.CANCELED) {
    icon = <AlertCircle className="w-32 h-32" strokeWidth={1.2} />;
    title = "Tu orden fue cancelada";
    description = "Hubo un error con su compra. Por favor, intente de nuevo.";
    button = true;
  }

  return (
    <div className="p-8 pt-0">
      <div className="flex flex-col items-center justify-center">
        <div>{icon}</div>
        <p className="text-center text-xl font-semibold">{title}</p>
        {description && (
          <p className="text-center text-gray-500 mt-2 max-w-sm">
            {description}
          </p>
        )}
      </div>
      {button && (
        <div className="mt-4 flex items-center justify-center">
          <Button onClick={handleClick}>Nueva orden</Button>
        </div>
      )}
    </div>
  );
};

export default OrderStatusVisualizer;
