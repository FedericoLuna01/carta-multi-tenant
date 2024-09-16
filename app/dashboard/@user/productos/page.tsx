import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export const metadata = {
  title: "Carta - Admin - Productos",
};

export async function ProductsPage() {
  noStore();
  const user = await auth();
  const products = await prismadb.product.findMany({
    where: {
      user: {
        slug: user.user.slug,
      },
    },
    include: {
      sizes: true,
      extras: true,
      subcategory: true,
    },
  });
  return (
    <section>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center ">
        <Heading title="Productos" description="Administra tus productos" />
        <Button className="my-4 sm:my-0" asChild>
          <Link href={`/${user.user.slug}/admin/productos/nuevo`}>
            Crear producto
          </Link>
        </Button>
      </div>
      <Separator />
      <div className=" max-w-7xl sm:max-w-full">
        <DataTable data={products} columns={columns} visibility />
      </div>
    </section>
  );
}

export default ProductsPage;
