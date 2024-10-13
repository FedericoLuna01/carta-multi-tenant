"use client"

import socket from "@/lib/socketio";
import { useEffect } from "react";

export function OrdersPageClient() {
  useEffect(() => {
    // Escuchar nuevas órdenes
    socket.on('receiveOrder', (order) => {
      console.log("nueva orden", order)
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      socket.off('receiveOrder');
    };
  }, []);
  return (
    <div>
      asd
    </div>
  )
}