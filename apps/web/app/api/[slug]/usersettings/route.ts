import { NextResponse } from "next/server";

import { auth } from "@/auth";
import prismadb from "@/lib/prismadb";
import { UserSettingsSchema } from "@/schemas";
import { checkUserAccess } from "@/utils/user";

export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const body = await req.json()
  const validatedFields = UserSettingsSchema.safeParse(body);

  if (!validatedFields.success) {
    return new NextResponse("Error in input values", { status: 400 });
  }

  const {
    dayOpenTime,
    dayCloseTime,
    nightOpenTime,
    nightCloseTime,
    table,
    delivery,
    takeaway,
    location,
    phone,
    image,
    qr,
    cash,
    card,
    cbu,
    qrImage,
    transfer
  } = validatedFields.data;

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    await prismadb.userSettings.create({
      data: {
        dayOpenTime,
        dayCloseTime,
        nightOpenTime,
        nightCloseTime,
        table,
        delivery,
        takeaway,
        location,
        phone,
        image,
        qr,
        cash,
        card,
        cbu,
        qrImage,
        transfer,
        userId: user.user.id
      },
    });

    return NextResponse.json("User settings created", { status: 201 });
  } catch (error) {
    // console.log("[USER_SETTINGS_POST]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;
  const body = await req.json()
  const validatedFields = UserSettingsSchema.safeParse(body);

  if (!validatedFields.success) {
    return new NextResponse("Error in input values", { status: 400 });
  }

  const {
    dayOpenTime,
    dayCloseTime,
    nightOpenTime,
    nightCloseTime,
    table,
    delivery,
    takeaway,
    location,
    phone,
    image,
    qr,
    cash,
    card,
    cbu,
    qrImage,
    transfer
  } = validatedFields.data;

  const user = await auth();
  const hasAccess = await checkUserAccess(slug, user)
  if (!hasAccess) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

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
        location,
        phone,
        image,
        qr,
        cash,
        card,
        cbu,
        qrImage,
        transfer
      },
      where: {
        userId: user.user.id,
      },
    });

    return NextResponse.json("User settings updated", { status: 200 });
  } catch (error) {
    // console.log("[USER_SETTINGS_PATCH]", error);
    return new NextResponse("Something went wrong", { status: 500 });
  }
}
