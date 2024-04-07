import CategoryForm from "@/components/forms/category-form";
import prismadb from "@/lib/prismadb";
import { unstable_noStore as noStore } from "next/cache";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  noStore();

  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  return <CategoryForm initialData={category} />;
};

export default CategoryPage;
