"use client"

import { unstable_noStore as noStore } from "next/cache";
import { Metadata } from "next";

import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { columns } from "./components/columns";
import { auth } from "@/auth";
import { OrdersPageClient } from "./page.client";
import socket, { joinUserRoom } from "@/lib/socketio";
import { useState, useEffect } from "react"
import { useUser } from "@/utils/user";

// export const metadata: Metadata = {
//   title: "Carta - Admin - Órdenes",
// };

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user && user.id) {
      console.log("adentro de use effect", user)
      joinUserRoom(user.id);

      // Escuchar nuevas órdenes
      socket.on('receiveOrder', (order) => {
        setOrders((prevOrders) => [order, ...prevOrders]);
      });

      // Cargar órdenes iniciales
      fetchOrders();

      // Limpiar el listener cuando el componente se desmonte
      return () => {
        socket.off('receiveOrder');
      };
    }
  }, [user]);

  const fetchOrders = async () => {
    if (user && user.slug) {
      const response = await fetch(`/api/${user.slug}/orders`);
      const data = await response.json();
      setOrders(data);
    }
  };

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Heading title="Ordenes" description="Administra tus ordenes" />
      </div>
      {/* TODO: Cambiar a server component */}
      {/* <OrdersPageClient /> */}
      <Separator />
      <DataTable data={orders} columns={columns} visibility order />
    </section>
  );
}
