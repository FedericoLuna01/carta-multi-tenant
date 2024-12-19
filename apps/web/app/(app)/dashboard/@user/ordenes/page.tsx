import { unstable_noStore as noStore } from "next/cache";
import { Metadata } from "next";

import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrdersPageClient } from "./page.client";
import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: "Carta - Admin - Órdenes",
};

export default async function OrdersPage() {
  noStore()
  const orders = await prismadb.order.findMany({
    include: {
      products: {
        include: {
          product: true,
          size: true,
          extras: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Heading title="Ordenes" description="Administra tus ordenes" />
      </div>
      <Separator />
      <OrdersPageClient orders={orders} />
    </section>
  );
}
