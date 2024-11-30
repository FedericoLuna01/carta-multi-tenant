import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

export async function POST() {
  try {
    // Verificar si ya existe algún usuario
    const userCount = await prismadb.user.count();
    
    if (userCount > 0) {
      return new NextResponse("Ya existe un usuario administrador", { status: 400 });
    }

    // Crear el primer usuario admin
    const hashedPassword = await bcrypt.hash("12345", 10);
    
    const admin = await prismadb.user.create({
      data: {
        email: "admin@carta.com",
        password: hashedPassword,
        name: "Admin",
        slug: "admin",
        role: UserRole.ADMIN,
        isActive: true
      },
    });

    return NextResponse.json({ 
      message: "Admin creado exitosamente",
      email: admin.email,
      password: "admin123"
    });

  } catch (error) {
    console.error("[INIT_ERROR]", error);
    return new NextResponse("Error interno del servidor", { status: 500 });
  }
}