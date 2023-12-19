import getAuth from "@/actions/getAuth"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
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

  const user = await getAuth()
  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 })
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

  try {
    const product = await prismadb.product.create({
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
    console.log('[PRODUCTS_POST]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }

}