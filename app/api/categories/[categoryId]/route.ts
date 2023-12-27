import getAuth from "@/actions/getAuth";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(req:Request, { params }: { params: { categoryId: string }}) {
  const { categoryId } = params;

  if(!categoryId) {
    return new NextResponse('Bad request', { status: 400 })
  }

  // const user = await getAuth()
  // if (!user) {
  //   return new NextResponse('Unauthorized', { status: 401 })
  // }

  try {
    const category = await prismadb.category.delete({
      where: {
        id: categoryId
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }

}

export async function PATCH(req: Request, {
  params
}: { params: { categoryId: string }}) {
  const { categoryId } = params;
  const body = await req.json()
  const { name } = body

  // const user = await getAuth()
  // if (!user) {
  //   return new NextResponse('Unauthorized', { status: 401 })
  // }

  if(!categoryId) {
    return new NextResponse('Bad request', { status: 400 })
  }

  if (!name) {
    return new NextResponse('Bad request', { status: 400 })
  }

  try {
    const category = await prismadb.category.update({
      where: {
        id: categoryId
      },
      data: {
        name
      }
    })
    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}