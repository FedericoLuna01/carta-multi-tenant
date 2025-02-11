import Link from "next/link";
import { Metadata } from "next";
// import { unstable_noStore as noStore } from "next/cache";
import { unstable_cache } from 'next/cache'

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Plato - Admin - Categorías",
};

const getCategories = unstable_cache(
  async (user) => {
    return await prismadb.category.findMany({
      where: {
        userId: user.user.id,
      },
    });
  },
  ["categories"],
  {
    revalidate: 3600, tags: ["categories"]
  }
)

async function CategoriesPage() {
  // noStore();
  const user = await auth();
  const categories = await getCategories(user)
  // const categories = await prismadb.category.findMany({
  //   where: {
  //     userId: user.user.id,
  //   },
  // });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Heading
          title="Categorías"
          description="Acá podrás ver todas las categorías que tienes en tu tienda."
        />
        <Button asChild>
          <Link
            href={`/dashboard/categorias/nuevo`}
            className="my-4 sm:my-0"
          >
            Crear categoría
          </Link>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={categories} />
    </div>
  );
}

export default CategoriesPage