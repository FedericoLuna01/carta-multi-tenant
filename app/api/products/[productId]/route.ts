import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function PATCH(req: Request, { params }: { params: { productId: string } }) {
  const body = await req.json()
  const {
    name,
    description,
    price,
    image,
    isArchived,
    isPromo,
    promoPrice,
    subcategoryId,
    sizes,
    extras
  } = body

  try {
    await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        description,
        price,
        image,
        isArchived,
        isPromo,
        promoPrice,
        subcategoryId,
        sizes: {
          deleteMany: {}
        },
        extras: {
          deleteMany: {}
        }
      }
    })

    const product = await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        sizes: {
          createMany: {
            data: sizes
          }
        },
        extras: {
          createMany: {
            data: extras
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCTS_PATCH]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { productId: string } }) {

  if(!params.productId) {
    return new NextResponse('Missing product id', { status: 400 })
  }

  try {
    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}