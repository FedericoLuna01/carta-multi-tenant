import { auth } from "@/auth";
import CategoryForm from "@/components/forms/category-form";
import prismadb from "@/lib/prismadb";
import { unstable_noStore as noStore } from "next/cache";

export default async function CategoryPage({ params }: { params: { categoryId: string } }) {
  noStore();

  const user = await auth();

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
      userId: user.user.id,
    },
  });

  return <CategoryForm initialData={category} />;
};

