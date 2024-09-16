import { unstable_noStore as noStore } from "next/cache";

import AdminAccordion from "@/components/admin-accordion";
import UserSettings from "@/components/user-settings";
import prismadb from "@/lib/prismadb";

const AdminPage = async ({ params }: { params: { slug: string } }) => {
  noStore();
  const userSettings = await prismadb.userSettings.findFirst({
    where: {
      user: {
        slug: params.slug,
      },
    },
  });

  const data = await prismadb.category.findMany({
    where: {
      user: {
        slug: params.slug,
      },
    },
    include: {
      subcategories: {
        include: {
          products: {
            where: {
              isArchived: false,
            },
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
    <section className="flex items-center flex-col">
      <UserSettings userSettings={userSettings} />
      <AdminAccordion slug={params.slug} data={data} />
    </section>
  );
};

export default AdminPage;