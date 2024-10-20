"use client"

import socket, { joinUserRoom } from "@/lib/socketio";
import { useState, useEffect, useCallback } from "react"
import { useUser } from "@/utils/user";
import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";

export function OrdersPageClient() {
  const [orders, setOrders] = useState([]);
  const user = useUser();

  const fetchOrders = useCallback(async () => {
    if (user && user.slug) {
      const response = await fetch(`/api/${user.slug}/orders`);
      const data = await response.json();
      setOrders(data.map(order => ({ ...order, key: order.id })));
    }
  }, [user]);

  useEffect(() => {
    if (user && user.id) {
      joinUserRoom(user.id);

      // Escuchar nuevas órdenes
      socket.on('receiveOrder', (order) => {
        setOrders((prevOrders) => [{ ...order, key: order.id }, ...prevOrders]);
      });

      // Cargar órdenes iniciales
      fetchOrders();

      // Limpiar el listener cuando el componente se desmonte
      return () => {
        socket.off('receiveOrder');
      };
    }
  }, [user, fetchOrders]);
  return (
    <DataTable data={orders} columns={columns} visibility order />
  )
}