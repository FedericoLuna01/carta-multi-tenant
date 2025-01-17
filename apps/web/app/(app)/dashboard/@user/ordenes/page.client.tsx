"use client"

import { columns } from "./components/columns";
import { DataTable } from "@/components/ui/data-table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useOrdersStore } from "@/stores/use-orders-store";
import { useUser } from "@/utils/user";

export function OrdersPageClient() {
  const { orders, isLoading, totalItems, fetchOrders, initialize, pageSize } = useOrdersStore();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const user = useUser();

  // Inicializar el socket y los listeners
  useEffect(() => {
    if (user?.id) {
      initialize(user.id);
    }
  }, [user?.id]);

  // Efecto para hacer el fetch inicial y sincronizar con URL params
  useEffect(() => {
    if (user?.slug) {
      const urlPage = parseInt(searchParams.get('page') ?? '1');
      const urlPageSize = parseInt(searchParams.get('pageSize') ?? '10');

      fetchOrders(user.slug, urlPage, urlPageSize);
    }
  }, [user?.slug, searchParams]);

  const handlePaginationChange = async (page: number, pageSize: number) => {
    if (user?.slug) {
      // Actualizar URL
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('pageSize', pageSize.toString());
      router.push(`${pathname}?${params.toString()}`);

      await fetchOrders(user.slug, page, pageSize);
    }
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
      pageCount={Math.ceil(totalItems / pageSize)}
      onPaginationChange={handlePaginationChange}
    />
  );
}