'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import Heading from "../ui/heading"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

const formSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }).max(50),
})

const CategoryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }
  return (
    <div>
      <Heading
        title='Crear categoria'
        description="Agrega una nueva categoria en tu tienda"
      />
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
          >
            Crear categoria
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CategoryForm