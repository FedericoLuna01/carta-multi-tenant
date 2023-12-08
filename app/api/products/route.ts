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