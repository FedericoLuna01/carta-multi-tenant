"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const register = async (values: z.infer<typeof RegisterSchema>) => {

  const user = await auth()

  if (!user || user.user.role !== UserRole.ADMIN) {
    return { error: "No tienes permisos para realizar esta acción" };
  }

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Error en los campos" };
  }

  const { password, email, name, slug } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Correo en uso" };
  }

  await prismadb.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      slug,
    },
  });

  revalidatePath("/dashboard/usuarios")

  return { success: "Cuenta creada correctamente" };
};
