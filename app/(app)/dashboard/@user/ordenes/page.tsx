import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { OrdersPageClient } from "./page.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carta - Admin - Órdenes",
};

export default function OrdersPage() {
  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Heading title="Ordenes" description="Administra tus ordenes" />
      </div>
      <Separator />
      <OrdersPageClient />
    </section>
  );
}
