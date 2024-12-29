"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Heading from "../ui/heading";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { EditUserSchema, RegisterSchema } from "@/schemas";
import { register } from "@/actions/auth/register";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { editUser } from "@/actions/user/edit-user";
import { Checkbox } from "../ui/checkbox";

interface UserFormProps {
  initialData: {
    name: string;
    email: string;
    slug: string;
    role: "USER" | "ADMIN";
    isActive: boolean;
  } | null;
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter()
  const params = useParams()

  const form = useForm<z.infer<typeof RegisterSchema | typeof EditUserSchema>>({
    resolver: zodResolver(initialData ? EditUserSchema : RegisterSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      slug: "",
      role: "USER",
      isActive: true
    },
  });

  const title = initialData ? "Editar usuario" : "Crear usuario";
  const description = initialData
    ? "Edita los datos del usuario"
    : "Agrega un nuevo usuario al sistema";
  const buttonText = initialData ? "Guardar cambios" : "Crear usuario";

  async function onSubmit(values: z.infer<typeof RegisterSchema | typeof EditUserSchema>) {
    if (!initialData) {
      startTransition(() => {
        register(values).then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/dashboard/usuarios");
          }
          if (data.error) {
            toast.error(data.error);
          }
          // console.log(data);
        });
      });
    } else {
      startTransition(() => {
        editUser(values, Array.isArray(params.userId) ? params.userId[0] : params.userId).then((data) => {
          if (data.success) {
            toast.success(data.success);
            router.push("/dashboard/usuarios");
          }
          if (data.error) {
            toast.error(data.error);
          }
          // console.log(data);
        });
      });
    }
  }

  return (
    <div className="pb-10">
      <div className="flex flex-col items-start gap-2">
        <div className="flex justify-between items-center w-full">
          <Heading title={title} description={description} />
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input placeholder="Carta" {...field} />
                </FormControl>
                <FormDescription>
                  Este es el nombre público.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="correo@ejemplo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Usuario</SelectItem>
                      <SelectItem value="ADMIN">Administrador</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            !initialData && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="***********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )
          }
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link de la página</FormLabel>
                <FormControl>
                  <Input placeholder="tucarta" {...field} />
                </FormControl>
                <FormDescription>
                  Este es el nombre que se mostrará en la URL. Por ejemplo:
                  tucarta.carta.com
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 h-fit">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Activo</FormLabel>
                    <FormDescription>
                      Este usuario podrá acceder al sistema
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          }
          <Button className="col-span-3 w-fit" disabled={isPending} type="submit">
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
