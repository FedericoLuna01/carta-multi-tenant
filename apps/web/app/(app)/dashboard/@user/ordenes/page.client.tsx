"use client"

import socket, { joinUserRoom } from "@/lib/socketio";
import { useState, useEffect } from "react";
import { useUser } from "@/utils/user";
import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { FullOrder } from "@/types/types";

export function OrdersPageClient({ orders }: { orders: FullOrder[] }) {
  const [data, setData] = useState<FullOrder[]>(orders);
  const user = useUser();

  useEffect(() => {
    if (user && user.id) {
      joinUserRoom(user.id);

      const handleNewOrder = (newOrder: FullOrder) => {
        setData((prevOrders) => [{ ...newOrder, key: newOrder.id }, ...prevOrders]);
      };

      socket.on('receiveOrder', handleNewOrder);

      return () => {
        socket.off('receiveOrder', handleNewOrder);
      };
    }
  }, [user]);

  return (
    <DataTable data={data} columns={columns} visibility order />
  );
}