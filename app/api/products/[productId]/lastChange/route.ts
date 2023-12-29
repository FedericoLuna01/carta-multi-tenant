import getAuth from "@/actions/getAuth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {

  if (!params.productId) {
    return new NextResponse('Missing product id', { status: 400 })
  }

  const user = await getAuth()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const oldProduct = await prismadb.product.findUnique({
      where: {
        id: params.productId
      }
    })

    if(!oldProduct) {
      return new NextResponse('Product not found', { status: 404 })
    }

    if(!oldProduct.lastChange) {
      return new NextResponse('Product already has a last change', { status: 400 })
    }

    if(oldProduct.lastChange) {
      const { lastChange } = oldProduct as any
      const updatedProduct = await prismadb.product.update({
        where: {
          id: oldProduct.id,
        },
        data: {
          name: lastChange.name,
          description: lastChange.description,
          price: lastChange.price,
          image: lastChange.image,
          isArchived: lastChange.isArchived,
          isPromo: lastChange.isPromo,
          promoPrice: lastChange.promoPrice,
          subcategoryId: lastChange.subcategoryId,
        }
      })

      if(lastChange.extras) {
        await Promise.all(lastChange.extras.map(async (extra: any) => {
          await prismadb.extra.deleteMany({
            where: {
              id: extra.id
            }
          })

          await prismadb.extra.create({
            data: {
              name: extra.name,
              price: extra.price,
              productId: updatedProduct.id
            }
          })
        }))
      }

      if(lastChange.sizes) {
        await Promise.all(lastChange.sizes.map(async (size: any) => {
          await prismadb.size.deleteMany({
            where: {
              id: size.id
            }
          })

          await prismadb.size.create({
            data: {
              name: size.name,
              price: size.price,
              productId: updatedProduct.id
            }
          })
        }))
      }

      return NextResponse.json(updatedProduct)
    }

  } catch (error) {
    console.error('[PATCH_PRODUCT-LASTCHANGE]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}