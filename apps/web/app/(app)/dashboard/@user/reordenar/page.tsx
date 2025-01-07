import { unstable_noStore as noStore } from "next/cache";

import prismadb from "@/lib/prismadb";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import SortableGrid from "./components/sortable-grid";
import { auth } from "@/auth";

export const metadata = {
  title: "Plato - Admin - Reordenar",
};

async function SortingPage() {
  noStore();

  const user = await auth();

  const data = await prismadb.category.findMany({
    where: {
      userId: user.user.id
    },
    include: {
      subcategories: {
        include: {
          products: {
            include: {
              sizes: true,
              extras: true,
            },
            orderBy: {
              sort: "asc",
            },
          },
        },
        orderBy: {
          sort: "asc",
        },
      },
    },
    orderBy: {
      sort: "asc",
    },
  });

  return (
    <div>
      <Heading
        title="Reordenar"
        description="Reordena las categorías y subcategorias a tu gusto."
      />
      <Separator className="my-4" />
      <div className="flex flex-col gap-4 pb-10">
        <SortableGrid data={data} />
      </div>
    </div>
  );
};

export default SortingPage;
