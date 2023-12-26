import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const body = await req.json();
  const {
    dayOpenTime,
    dayCloseTime,
    nightOpenTime,
    nightCloseTime,
    table,
    delivery,
    takeaway,
    ubication
  } = body

  try {
    await prismadb.userSettings.update({
      data: {
        dayOpenTime,
        dayCloseTime,
        nightOpenTime,
        nightCloseTime,
        table,
        delivery,
        takeaway,
        ubication
      },
      where: {
        id: '07e08cc8-9e7d-4fec-9ea2-2fc1668aef38'
      }
    })

    return NextResponse.json('User settings updated', { status: 200 })

  } catch (error) {
    console.log('[USER_SETTIINGS_PACH]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}