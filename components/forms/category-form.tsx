'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Heading from "../ui/heading"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { useRouter } from "next/navigation"
import { Category } from "@prisma/client"
import { Trash } from "lucide-react"
import { AlertModal } from "../modals/alert-modal"

const formSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }).max(50),
})

interface CategoryFormProps {
  initialData: Category | null
}

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData }) => {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
    },
  })

  const title = initialData ? 'Editar categoria' : 'Crear categoria'
  const description = initialData ? 'Edita una categoria en tu tienda' : 'Agrega una nueva categoria en tu tienda'
  const buttonText = initialData ? 'Editar categoria' : 'Crear categoria'
  const toastText = initialData ? 'Categoria editada con exito' : 'Categoria creada con exito'

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if(initialData) {
        await axios.patch(`/api/categories/${initialData?.id}`, data)
      } else {
        await axios.post('/api/categories', data)
      }
      router.refresh()
      router.push('/admin/categorias')
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
      await axios.delete(`/api/categories/${initialData?.id}`)
      router.push('/admin/categorias')
      router.refresh()
      toast.success('Categoria eliminada con exito')
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
            className="grid grid-cols-1 md:grid-cols-3"
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

export default CategoryForm