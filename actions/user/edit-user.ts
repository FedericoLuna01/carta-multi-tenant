"use server"

import * as z from "zod";
import { EditUserSchema } from "@/schemas"
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import prismadb from "@/lib/prismadb";
import { getUserByEmail } from "@/utils/user";

export const editUser = async (values: z.infer<typeof EditUserSchema>, userId: string) => {
  const user = await auth()

  if (!user || user.user.role !== UserRole.ADMIN) {
    return { error: "No tienes permisos para realizar esta acción" };
  }

  const validatedFields = EditUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Error en los campos" };
  }

  const { email, name, slug, role } = validatedFields.data;


  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Correo en uso" };
  }

  await prismadb.user.update({
    where: {
      id: userId
    },
    data: {
      email,
      name,
      slug,
      role
    },
  });

  revalidatePath("/dashboard/usuarios")

  return { success: "Cuenta creada correctamente" };
}