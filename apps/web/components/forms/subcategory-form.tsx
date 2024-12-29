"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

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
import { type Category, type Subcategory } from "@prisma/client";
import { AlertModal } from "../modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SubcategorySchema } from "@/schemas";
import { useUser } from "@/utils/user";

interface SubcategoryFormProps {
  initialData: Subcategory | null;
  categories: Category[];
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({
  initialData,
  categories,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const router = useRouter();
  const user = useUser()

  const form = useForm<z.infer<typeof SubcategorySchema>>({
    resolver: zodResolver(SubcategorySchema),
    defaultValues: initialData || {
      name: "",
      categoryId: category || "",
    },
  });

  const title = initialData ? "Editar subcategoría" : "Crear subcategoría";
  const description = initialData
    ? "Edita una subcategoría en tu tienda"
    : "Agrega una nueva subcategoría en tu tienda";
  const buttonText = initialData ? "Editar subcategoría" : "Crear subcategoría";
  const toastText = initialData
    ? "Subcategoría editada con éxito"
    : "Subcategoría creada con éxito";

  async function onSubmit(data: z.infer<typeof SubcategorySchema>) {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${user.slug}/subcategories/${initialData?.id}`, data);
      } else {
        await axios.post(`/api/${user.slug}/subcategories`, data);
      }
      router.push(`/dashboard/subcategorias`);
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
      await axios.delete(`/api/${user.slug}/subcategories/${initialData?.id}`);
      router.push(`/dashboard/subcategorias`);
      router.refresh();
      toast.success("Subcategoría eliminada con éxito");
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoría a la que va a pertenecer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

export default SubcategoryForm;
