"use client";

import { OrderPayment, OrderStatus, UserSettings } from "@prisma/client";
import axios from "axios";
import {
  AlertCircle,
  Bike,
  ChefHat,
  UtensilsCrossed,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Spinner from "./ui/spinner";
import { useParams } from "next/navigation";
import { Separator } from "./ui/separator";
import Image from "next/image";
import useOrderUser from "@/hooks/use-order-user";
import { getTotalOrderPrice } from "@/actions/getTotalPrice";
import { FullOrder } from "@/types/types";
import { formatter } from "@/lib/utils";

interface OrderStatusProps {
  orderId: string;
  userSettings: UserSettings;
}

const OrderStatusVisualizer: React.FC<OrderStatusProps> = ({ orderId, userSettings }) => {
  const [order, setOrder] = useState<FullOrder | null>();
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const { user } = useOrderUser()
  const params = useParams()

  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);
      // const res = await axios(`https://carta.ar/api/${params.slug}/orders/${orderId}`);
      const url = process.env.DOMAIN_NAME ? "https://carta.ar" : "http://localhost:3000";
      const res = await axios(`${url}/api/${params.slug}/orders/${orderId}`);
      setOrder(res.data);
      const total = getTotalOrderPrice(res.data)
      setTotal(total);
      setLoading(false);
    };
    getOrder();

    // Suscribirse a actualizaciones de la orden
    // socket.on('orderUpdated', (updatedOrder: FullOrder) => {
    //   if (updatedOrder.id === Number(orderId)) {
    //     setOrder(updatedOrder);
    //     const newTotal = getTotalOrderPrice(updatedOrder);
    //     setTotal(newTotal);
    //   }
    // });

    // return () => {
    //   socket.off('orderUpdated');
    // };
  }, [orderId, params.slug]);

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
        <div className="flex flex-col items-center justify-center text-center">
          {icon}
          <p className="text-xl font-semibold">{title}</p>
          <p className="text-gray-500 mt-2 max-w-sm">
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
      {
        order.payment === OrderPayment.QR && !button && (
          <div className="mt-4 text-center">
            <Separator className="mb-4" />
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xl">Para pagar escanear este código QR</p>
              <Image src={userSettings.qrImage} width={200} height={200} alt="Código qr de pago" />
              <p>
                Monto: {formatter.format(total)}
              </p>
            </div>
          </div>
        )
      }
      {
        order.payment === OrderPayment.TRANSFER && !button && (
          <div className="mt-4 text-center">
            <Separator className="mb-4" />
            <div className="flex flex-col items-center">
              <p className="font-semibold text-xl">Para pagar transferir a:</p>
              <p className="text-xl">
                CBU/Alias: <span className="font-semibold">{userSettings.cbu}</span>
              </p>
              <p>
                Monto: {formatter.format(total)}
              </p>
            </div>
          </div>
        )
      }
      {
        (order.payment === OrderPayment.QR ||
          order.payment === OrderPayment.TRANSFER) && !button && (
          <p className="text-center">
            Una vez hecho el pago enviar comprobante a este número: {" "}
            <a target="_blank" className="text-blue-500 underline pointer" href={`https://wa.me/${userSettings.phone}?text=Hola, soy ${user.name}! acabo de pagar mi orden con el código QR.`}>{userSettings.phone}</a>
          </p>
        )
      }
      {button && (
        <div className="mt-4 flex items-center justify-center">
          <Button onClick={handleClick}>Nueva orden</Button>
        </div>
      )}
    </div>
  );
};

export default OrderStatusVisualizer;
