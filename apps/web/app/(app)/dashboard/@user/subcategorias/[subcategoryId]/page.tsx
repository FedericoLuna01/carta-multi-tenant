import { unstable_noStore as noStore } from "next/cache"

import SubcategoryForm from '@/components/forms/subcategory-form'
import prismadb from '@/lib/prismadb'
import { auth } from "@/auth"

const SubcategoryPage = async ({ params }: { params: { subcategoryId: string } }) => {
  noStore()
  const user = await auth()
  const categories = await prismadb.category.findMany({
    where: {
      user: {
        slug: user.user.slug
      }
    }
  })

  const subcategory = await prismadb.subcategory.findFirst({
    where: {
      id: params.subcategoryId,
      user: {
        slug: user.user.slug
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