import { unstable_noStore as noStore } from "next/cache"

import SubcategoryForm from '@/components/forms/subcategory-form'
import prismadb from '@/lib/prismadb'

const SubcategoryPage = async ({ params }: { params: { subcategoryId: string, slug: string } }) => {
  noStore()

  const categories = await prismadb.category.findMany({
    where: {
      user: {
        slug: params.slug
      }
    }
  })

  const subcategory = await prismadb.subcategory.findFirst({
    where: {
      id: params.subcategoryId,
      user: {
        slug: params.slug
      }
    }
  })

  return (
    <div>
      <SubcategoryForm
        initialData={subcategory}
        categories={categories}
      />
    </div>
  )
}

export default SubcategoryPage