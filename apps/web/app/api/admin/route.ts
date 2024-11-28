import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, password, name, slug, role } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await prismadb.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      slug,
      role
    },
  });

  return new NextResponse("User created", { status: 201 });
}