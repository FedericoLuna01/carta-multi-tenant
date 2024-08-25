import Link from "next/link";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";

export const metadata: Metadata = {
  title: "Carta - Admin - Categorías",
};

export async function CategoriesPage({ params }: { params: { slug: string } }) {
  noStore();
  const categories = await prismadb.category.findMany();
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Heading
          title="Categorias"
          description="Acá podrás ver todas las categorías que tienes en tu tienda."
        />
        <Button asChild>
          <Link href={`/${params.slug}/admin/categorias/nuevo`} className="my-4 sm:my-0">
            Crear categoría
          </Link>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} />
    </div>
  );
};

export default CategoriesPage;
