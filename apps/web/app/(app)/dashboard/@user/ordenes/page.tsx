import { Separator } from "@/components/ui/separator";
import { OrdersPageClient } from "./page.client";
import Heading from "@/components/ui/heading";

export default async function OrdersPage() {
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
