import CategoryForm from "@/components/forms/category-form";
import prismadb from "@/lib/prismadb";
import { getUserBySlug } from "@/utils/user";
import { unstable_noStore as noStore } from "next/cache";

export async function CategoryPage({ params }: { params: { categoryId: string, slug: string } }) {
  noStore();

  const user = await getUserBySlug(params.slug);

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
      userId: user.id,
    },
  });

  return <CategoryForm initialData={category} />;
};

export default CategoryPage;
