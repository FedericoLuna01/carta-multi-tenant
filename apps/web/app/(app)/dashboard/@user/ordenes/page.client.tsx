"use client"

import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useOrders } from "@/contexts/orders-context";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Componente interno que maneja la lógica del cliente
export function OrdersPageClient() {
  const { orders, isLoading, totalItems, fetchOrders } = useOrders();
  const searchParams = useSearchParams();
  const currentPageSize = parseInt(searchParams.get('pageSize') ?? '10');
  const currentPage = parseInt(searchParams.get('page') ?? '1');

  // Efecto para hacer el fetch inicial si hay parámetros en la URL
  useEffect(() => {
    if (searchParams.has('page') || searchParams.has('pageSize')) {
      fetchOrders(currentPage, currentPageSize);
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  const handlePaginationChange = async (page: number, pageSize: number) => {
    await fetchOrders(page, pageSize);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <DataTable 
      data={orders} 
      columns={columns} 
      visibility 
      order
      pageCount={Math.ceil(totalItems / currentPageSize)}
      onPaginationChange={handlePaginationChange}
    />
  );
}