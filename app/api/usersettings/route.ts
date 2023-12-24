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
        id: '4b97cf01-eaeb-49f5-9646-2148955ec10b'
      }
    })

    return NextResponse.json('User settings updated', { status: 200 })

  } catch (error) {
    console.log('[USER_SETTIINGS_PACH]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}