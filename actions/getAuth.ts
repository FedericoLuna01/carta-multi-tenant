import { JwtPayload, verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function getAuth(): Promise<{
  email: string;
  authorized: boolean;
} | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("auth");
    if (!token) {
      return null;
    }

    const { email, authorized } = verify(
      token.value,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    return {
      email,
      authorized,
    };
  } catch (error) {
    return null;
  }
}
