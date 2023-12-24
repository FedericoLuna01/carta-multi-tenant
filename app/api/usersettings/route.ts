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
      },
      where: {
        id: 'a301fffa-faf9-44bf-8449-b9f2469aeb5f'
      }
    })

    return NextResponse.json('User settings updated', { status: 200 })

  } catch (error) {
    console.log('[USER_SETTIINGS_PACH]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}