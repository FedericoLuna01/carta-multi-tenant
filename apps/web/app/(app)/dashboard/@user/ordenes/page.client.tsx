"use client"

import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useOrders } from "@/contexts/orders-context";

export function OrdersPageClient() {
  const { orders, isLoading } = useOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <DataTable data={orders} columns={columns} visibility order />
  );
}