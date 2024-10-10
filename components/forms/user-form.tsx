"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Trash } from "lucide-react";
import axios from "axios";
import { useState } from "react";
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
import { AlertModal } from "../modals/alert-modal";
import Link from "next/link";
import { RegisterSchema } from "@/schemas";

interface UserFormProps {
  initialData: {
    name: string;
    email: string;
    password: string;
    slug: string;
    role: "USER" | "ADMIN";
  } | null;
}

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const params = useParams();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      password: "",
      slug: "",
      role: "USER",
    },
  });

  const title = initialData ? "Editar usuario" : "Crear usuario";
  const description = initialData
    ? "Edita los datos del usuario"
    : "Agrega un nuevo usuario al sistema";
  const buttonText = initialData ? "Guardar cambios" : "Crear usuario";
  const toastText = initialData
    ? "Usuario actualizado con éxito"
    : "Usuario creado con éxito";

  async function onSubmit(data: z.infer<typeof RegisterSchema>) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/users/${params.userId}`, data);
      } else {
        await axios.post(`/api/users`, data);
      }
      router.push(`/dashboard/usuarios`);
      router.refresh();
      toast.success(toastText);
    } catch (error: any) {
      toast.error("Algo salió mal");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/users/${params.userId}`);
      router.push(`/dashboard/usuarios`);
      router.refresh();
      toast.success("Usuario eliminado con éxito");
    } catch (error: any) {
      toast.error("Algo salió mal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pb-10">
      <AlertModal
        isOpen={isOpen}
        loading={loading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex flex-col items-start gap-2">
        <Link
          href={`/dashboard/usuarios`}
          className="flex flex-row items-center gap-2 font-semibold text-gray-700 hover:underline"
        >
          ← Volver
        </Link>
        <div className="flex justify-between items-center w-full">
          <Heading title={title} description={description} />
          {initialData && (
            <Button
              size="icon"
              variant="destructive"
              onClick={() => setIsOpen(true)}
            >
              <Trash className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button disabled={loading} type="submit">
            Crear
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
