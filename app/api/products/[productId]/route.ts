import getAuth from "@/actions/getAuth"
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

  if (!params.productId) {
    return new NextResponse('Missing product id', { status: 400 })
  }

  if(!name) {
    return new NextResponse('Missing product name', { status: 400 })
  }

  if(!price) {
    return new NextResponse('Missing product price', { status: 400 })
  }

  if(!subcategoryId) {
    return new NextResponse('Missing product subcategory', { status: 400 })
  }

  if(!image) {
    return new NextResponse('Missing product image', { status: 400 })
  }

  const user = await getAuth()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const oldProduct = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      select: {
        name: true,
        description: true,
        price: true,
        image: true,
        isArchived: true,
        isPromo: true,
        promoPrice: true,
        subcategoryId: true,
        sizes: {
          select: {
            price: true,
            name: true
          }
        },
        extras: {
          select: {
            price: true,
            name: true
          }
        },
      }
    })

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
        },
        lastChange: oldProduct as any
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

  const user = await getAuth()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
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