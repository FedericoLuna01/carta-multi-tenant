import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(2, { message: "Mínimo 8 caracteres" }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "El email inválido" }),
  password: z.string().min(2, { message: "Mínimo 2 caracteres" }),
  name: z.string().min(1, { message: "El nombre es requerido" }),
  slug: z.string().min(1, { message: "Link es requerido" }).regex(/^\S*$/, "El link no debe contener espacios"),
});