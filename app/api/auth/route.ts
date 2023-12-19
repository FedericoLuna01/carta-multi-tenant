import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth");

  if (!token) {
    return NextResponse.json('Not logged in', { status: 401 })
  }

  const { email, authorized } = verify(token.value, process.env.JWT_SECRET as string) as JwtPayload;

  return NextResponse.json({
    email, authorized
  });
}