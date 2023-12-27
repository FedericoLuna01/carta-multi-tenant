import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth");
    console.log(token)
    if (!token) {
      return new NextResponse('Not logged in', { status: 401 })
    }

    const { email, authorized } = verify(token.value, process.env.JWT_SECRET as string) as JwtPayload;

    return NextResponse.json({
      email, authorized
    });
  } catch (error) {
    console.log(error)
    return new NextResponse('Something went wrong', { status: 500 })
  }

}