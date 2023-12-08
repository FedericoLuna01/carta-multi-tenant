'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Trash } from "lucide-react"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Heading from "../ui/heading"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { useRouter } from "next/navigation"
import { Category, type Subcategory } from "@prisma/client"
import { AlertModal } from "../modals/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const formSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }).max(50),
  categoryId: z.string().min(1, { message: 'La categoría es requerida' }),
})

interface SubcategoryFormProps {
  initialData: Subcategory | null
  categories: Category[]
}

const SubcategoryForm: React.FC<SubcategoryFormProps> = ({ initialData, categories }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      categoryId: ""
    },
  })

  const title = initialData ? 'Editar subcategoria' : 'Crear subcategoria'
  const description = initialData ? 'Edita una subcategoria en tu tienda' : 'Agrega una nueva subcategoria en tu tienda'
  const buttonText = initialData ? 'Editar subcategoria' : 'Crear subcategoria'
  const toastText = initialData ? 'Subcategoría editada con exito' : 'Subcategoría creada con exito'

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if(initialData) {
        await axios.patch(`/api/subcategories/${initialData?.id}`, data)
      } else {
        await axios.post('/api/subcategories', data)
      }
      router.push('/admin/subcategorias')
      router.refresh()
      toast.success(toastText)
    } catch (error: any) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
    }
  }

  async function onDelete() {
    try {
      setLoading(true)
      const res = await axios.delete(`/api/subcategories/${initialData?.id}`)
      console.log(res)
      router.push('/admin/subcategorias')
      router.refresh()
      toast.success('Subcategoria eliminada con exito')
    } catch (error: any) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
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
      <div
        className="flex justify-between items-center"
      >
        <Heading
          title={title}
          description={description}
        />
        {
          initialData && (
            <Button
              size='icon'
              variant='destructive'
              onClick={() => setOpen(true)}
            >
              <Trash className="w-5 h-5" />
            </Button>
          )
        }
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tragos" {...field} className="grid-span-1" />
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
                  <Select value={field.value} onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoría a la que va a pertenecer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        categories.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id}
                          >
                            {item.name}
                          </SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            className="mt-5"
            type="submit"
            disabled={loading}
          >
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SubcategoryForm