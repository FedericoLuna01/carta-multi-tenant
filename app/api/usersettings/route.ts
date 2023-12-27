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

    const userSettings = await prismadb.userSettings.findFirst()

    if(!userSettings) {
      await prismadb.userSettings.create({
        data: {
          dayOpenTime,
          dayCloseTime,
          nightOpenTime,
          nightCloseTime,
          table,
          delivery,
          takeaway,
          ubication
        }
      })
      return NextResponse.json('User settings created', { status: 201 })
    }

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
        id: userSettings.id
      }
    })

    return NextResponse.json('User settings updated', { status: 200 })

  } catch (error) {
    console.log('[USER_SETTIINGS_PACH]', error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}