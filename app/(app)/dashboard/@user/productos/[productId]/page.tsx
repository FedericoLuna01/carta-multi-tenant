import { unstable_noStore as noStore } from "next/cache";

import ProductForm from "@/components/forms/product-form";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  noStore();
  const user = await auth();

  const subcategories = await prismadb.subcategory.findMany({
    where: {
      user: {
        slug: user.user.slug,
      },
    },
  });
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      sizes: true,
      extras: true,
    },
  });

  const formattedProduct = product
    ? {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        subcategoryId: product.subcategoryId,
        isArchived: product.isArchived,
        isPromo: product.isPromo,
        promoPrice: product.promoPrice,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        sizes: product.sizes.map((size) => ({
          name: size.name,
          price: size.price,
        })),
        extras: product.extras.map((extra) => ({
          name: extra.name,
          price: extra.price,
        })),
      }
    : null;

  return (
    <ProductForm subcategories={subcategories} initialData={formattedProduct} />
  );
};

export default ProductPage;
