import Link from "next/link";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { columns } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Carta - Admin - Subcategorias",
};

const SubcategoriesPage = async () => {
  noStore();
  const user = await auth()
  const subcategories = await prismadb.subcategory.findMany({
    where: {
      userId: user.user.id
    },
    include: {
      category: true,
    },
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Heading
          title="Subcategorias"
          description="Acá podrás ver todas las subcategorias que tienes en tu tienda."
        />
        <Button asChild className="my-4 sm:my-0">
          <Link href={`/dashboard/subcategorias/nuevo`}>Crear subcategoría</Link>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={subcategories} />
    </div>
  );
};

export default SubcategoriesPage;
