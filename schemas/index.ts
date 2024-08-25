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

export const UserSettingsSchema = z.object({
  dayOpenTime: z.string().min(1, { message: "El horario es requerido" }),
  dayCloseTime: z.string().min(1, { message: "El horario es requerido" }),
  nightOpenTime: z.string().min(1, { message: "El horario es requerido" }),
  nightCloseTime: z.string().min(1, { message: "El horario es requerido" }),
  image: z.string().optional(),
  location: z.string().min(1, "La ubicación es requerida"),
  phone: z.string().min(1, "El teléfono es requerido"),
  table: z.boolean(),
  delivery: z.boolean(),
  takeaway: z.boolean(),
})

export const CategorySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }).max(50),
})

export const SubcategorySchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }).max(50),
  categoryId: z.string().min(1, { message: "La categoría es requerida" }),
})

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }).max(50),
  description: z.string().optional(),
  price: z.coerce.number().min(1, { message: "El precio es requerido" }),
  image: z.string().min(1, { message: "La imagen es requerida" }),
  subcategoryId: z.string().min(1, { message: "La categoría es requerida" }),
  sizes: z.array(
    z.object({
      name: z.string().min(1, { message: "El tamaño es requerido" }),
      price: z.coerce.number().min(1, { message: "El precio es requerido" }),
    })
  ),
  extras: z.array(
    z.object({
      name: z.string().min(1, { message: "El extra es requerido" }),
      price: z.coerce.number().min(1, { message: "El precio es requerido" }),
    })
  ),
  promoPrice: z.coerce.number().optional(),
  isPromo: z.boolean().optional().default(false),
  isArchived: z.boolean().optional().default(false),
})

export const OrderSchema = z.object({
  name: z.string().min(2, { message: "El nombre es requerido" }).max(50),
  phone: z.string().min(2, { message: "El teléfono es requerido" }).max(10),
  comment: z.string().max(50).optional(),
  type: z.enum(["DELIVERY", "TAKEAWAY", "TABLE"]),
  place: z.string().max(50).optional(),
});