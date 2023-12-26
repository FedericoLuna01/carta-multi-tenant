import getAuth from "@/actions/getAuth"
import prismadb from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  const { name } = body

  // const user = await getAuth()
  // if (!user) {
  //   return new NextResponse('Unauthorized', { status: 401 })
  // }

  if(!name) {
    return new NextResponse('Missing name', { status: 400 })
  }

  try {
    const category = await prismadb.category.create({
      data: {
        name
      }
    })

    return NextResponse.json(category)

  } catch (error: any) {
    console.log('[CATEGORY_POST]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }

}