import { Separator } from "@/components/ui/separator";
import { OrdersPageClient } from "./page.client";
import Heading from "@/components/ui/heading";
import { auth } from "@/auth";
import { CircleFadingArrowUpIcon } from "lucide-react";

export default async function OrdersPage() {
  const user = await auth()
  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Heading title="Ordenes" description="Administra tus ordenes" />
      </div>
      <Separator />
      {
        user.user.isPremium ? (
          <OrdersPageClient />
        ) : (
          <div
            className="flex items-center justify-center h-full"
          >
            <div className="flex flex-col gap-4 items-center max-w-md text-center">
              <CircleFadingArrowUpIcon className="w-24 h-24" strokeWidth={1.2} />
              <p className="text-3xl font-bold">
                Función exclusiva para usuarios premium
              </p>
              <p className="text-lg text-muted-foreground">
                {/* TODO: Agregar link */}
                Si te interesa acceder a esta función, por favor contacta a soporte: <a className="underline text-blue-600" href="">@platomenu</a>
              </p>
            </div>
          </div>
        )
      }
    </section>
  );
}
