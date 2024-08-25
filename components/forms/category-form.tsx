"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Heading from "../ui/heading";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { useParams, useRouter } from "next/navigation";
import { Category } from "@prisma/client";
import { Trash } from "lucide-react";
import { AlertModal } from "../modals/alert-modal";
import { CategorySchema } from "@/schemas";

interface CategoryFormProps {
  initialData: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const params = useParams()

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData || {
      name: "",
    },
  });

  const title = initialData ? "Editar categoría" : "Crear categoría";
  const description = initialData
    ? "Edita una categoría en tu tienda"
    : "Agrega una nueva categoría en tu tienda";
  const buttonText = initialData ? "Editar categoría" : "Crear categoría";
  const toastText = initialData
    ? "Categoría editada con éxito"
    : "Categoría creada con éxito";

  async function onSubmit(data: z.infer<typeof CategorySchema>) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.slug}/categories/${initialData.id}`, data);
      } else {
        await axios.post(`/api/${params.slug}/categories`, data);
      }
      router.push(`/${params.slug}/admin/categorias`);
      router.refresh();
      toast.success(toastText);
    } catch (error: any) {
      toast.error("Algo salio mal");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.slug}/categories/${initialData?.id}`);
      router.push(`/${params.slug}/admin/categorias`);
      router.refresh();
      toast.success("Categoría eliminada con éxito");
    } catch (error: any) {
      toast.error("Algo salio mal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
      />
      <div className="flex flex-col items-start gap-2">
        <Link
          href={`/${params.slug}/admin/categorias`}
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
              onClick={() => setOpen(true)}
            >
              <Trash className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tragos"
                      {...field}
                      className="grid-span-1"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-5" type="submit" disabled={loading}>
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
