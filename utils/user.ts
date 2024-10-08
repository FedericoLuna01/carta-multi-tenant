import prismadb from "@/lib/prismadb";
import { UserRole } from "@prisma/client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

export const useUser = () => {
  const user = useSession();
  return user.data?.user;
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserBySlug = async (slug: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        slug,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const checkUserAccess = async (slug: string, user: Session) => {
  if (!user) {
    return false;
  }

  if (user.user.slug !== slug) {
    return false;
  }

  return true;
};

export const checkAdminAccess = async (user: Session) => {
  if (!user) {
    return false;
  }

  if (user.user.role !== UserRole.ADMIN) {
    return false;
  }

  return true;
}