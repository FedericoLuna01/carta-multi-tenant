"use server"

import { auth } from "@/auth"
import prismadb from "@/lib/prismadb"
import { UserNoPass } from "@/types/types"
import { checkAdminAccess } from "@/utils/user"
import { revalidatePath } from "next/cache"

export const deleteUser = async (user: UserNoPass) => {
  const session = await auth()
  const hasAccess = checkAdminAccess(session)
  if (!hasAccess) {
    return { error: "No tienes permisos para realizar esta acción" }
  }

  try {
    await prismadb.user.delete({
      where: {
        id: user.id
      }
    })

    revalidatePath("/dashboard/usuarios")

    return { success: "Usuario eliminado correctamente" }

  } catch (error: any) {
    // console.log("[DELETE_USER]", error)
    return { error: "Algo salió mal" }
  }

}