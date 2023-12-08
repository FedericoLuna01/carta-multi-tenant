import ProductForm from "@/components/forms/product-form"
import prismadb from "@/lib/prismadb"

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const subcategories = await prismadb.subcategory.findMany()
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId
    },
    include: {
      sizes: true,
      extras: true,
    }
  })
  return (
    <ProductForm
      subcategories={subcategories}
      initialData={product}
    />
  )
}

export default ProductPage