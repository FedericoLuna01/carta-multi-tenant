'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import Heading from '../ui/heading'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import ImageUpload from "../ui/image-upload"

const formSchema = z.object({
  name: z.string().min(1, { message: 'El nombre es requerido' }).max(50),
  description: z.string(),
  price: z.coerce.number().min(1, { message: 'El precio es requerido' }),
  image: z.string().min(1, { message: 'La imagen es requerida' }),
  category: z.string().min(1, { message: 'La categoria es requerida' }),
  discount: z.coerce.number().max(50).optional(),
  isPromo: z.boolean().optional().default(false),
  isArchived: z.boolean().optional().default(false),
})

const ProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image: "",
      category: "",
      discount: 0,
      isPromo: false,
      isArchived: false,
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
  }

  return (
    <div>
      <Heading
        title='Crear producto'
        description='Agrega un nuevo producto en tu tienda'
      />
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem
                className="flex flex-col col-span-3"
              >
                <FormLabel>Imagen</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div
            className="grid grid-cols-3 gap-4"
          >

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Capuccino" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input placeholder="Café con leche y un poco de canela" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Precio</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="5345" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Categoría
                  </FormLabel>
                  <Select
                  // disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Selecciona una categoría'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        value='Hola'
                      >
                          Categoria 1
                      </SelectItem>
                      {/* {
                      colors.map((color) => (
                        <SelectItem
                          key={color.id}
                          value={color.id}
                        >
                          {color.name}
                        </SelectItem>
                      ))
                    } */}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='isPromo'
              render={({ field }) => (
                <FormItem
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div
                    className='space-y-1 leading-none'
                  >
                    <FormLabel>
                      En promoción
                    </FormLabel>
                    <FormDescription>
                      Este producto se mostrará en la sección de promociones
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {
              form.watch('isPromo') && (
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descuento</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>
                      Este será el nuevo precio del producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            }
            <FormField
              control={form.control}
              name='isArchived'
              render={({ field }) => (
                <FormItem
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div
                    className='space-y-1 leading-none'
                  >
                    <FormLabel>
                      Archivado
                    </FormLabel>
                    <FormDescription>
                      Este producto no se mostrará en la tienda
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Button
            // disabled={loading}
            className='mt-5'
            type='submit'
          >
            Crear producto
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm