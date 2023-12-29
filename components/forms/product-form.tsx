'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from 'zod'
import { Trash } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import toast from "react-hot-toast"

import Heading from '../ui/heading'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Separator } from "../ui/separator"
import ImageUpload from "../ui/image-upload"
import { Subcategory } from "@prisma/client"
import { AlertModal } from "../modals/alert-modal"

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre es requerido' })
    .max(50),
  description: z
    .string()
    .optional(),
  price: z.
    coerce
    .number()
    .min(1, { message: 'El precio es requerido' }),
  image: z
    .string()
    .min(1, { message: 'La imagen es requerida' }),
  subcategoryId: z
    .string()
    .min(1, { message: 'La categoria es requerida' }),
  sizes: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: 'El tamaño es requerido' }),
        price: z
          .coerce
          .number()
          .min(1, { message: 'El precio es requerido' })
      })
    ),
  extras: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: 'El extra es requerido' }),
        price: z
          .coerce
          .number()
          .min(1, { message: 'El precio es requerido' })
      })
    ),
  promoPrice: z
    .coerce
    .number()
    .optional(),
  isPromo: z
    .boolean()
    .optional()
    .default(false),
  isArchived: z
    .boolean()
    .optional()
    .default(false),
})

interface ProductFormProps {
  subcategories: Subcategory[]
  initialData: {
    name: string;
    price: number;
    image: string;
    subcategoryId: string;
    sizes: {
      name: string;
      price: number;
    }[];
    extras: {
      name: string;
      price: number;
    }[];
    isPromo: boolean;
    isArchived: boolean;
    description?: string | null | undefined
    promoPrice: number | null
  }
  | null
}

const ProductForm: React.FC<ProductFormProps> = ({ subcategories, initialData }) => {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const searchParams = useSearchParams()
  const subcategory = searchParams.get('subcategory')
  const router = useRouter()
  const params = useParams()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      ...initialData,
      description: initialData.description ? initialData.description : undefined,
      promoPrice: initialData.promoPrice ? initialData.promoPrice : 0
    } : {
      name: "",
      description: "",
      price: 0,
      image: "",
      subcategoryId: subcategory || "",
      sizes: [],
      extras: [],
      promoPrice: 0,
      isPromo: false,
      isArchived: false,
    },
  })

  const title = initialData ? 'Editar producto' : 'Crear producto'
  const description = initialData ? 'Edita un producto en tu tienda' : 'Agrega un nuevo producto en tu tienda'
  const buttonText = initialData ? 'Editar producto' : 'Crear producto'
  const toastText = initialData ? 'Producto editado con exito' : 'Producto creado con exito'

  // Controlador de los tamaños
  const {
    fields: sizesFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    name: 'sizes',
    control: form.control,
  })

  // Controlador de los extras
  const {
    fields: extrasFields,
    append: appendExtra,
    remove: removeExtra,
  } = useFieldArray({
    name: 'extras',
    control: form.control,
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      if(initialData) {
        await axios.patch(`/api/products/${params.productId}`, data)
      } else {
        await axios.post('/api/products', data)
      }
      router.push('/admin/productos')
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
      await axios.delete(`/api/products/${params.productId}`)
      router.push('/admin/productos')
      router.refresh()
      toast.success('Producto eliminado con exito')
    } catch (error: any) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="pb-10"
    >
      <AlertModal
        isOpen={isOpen}
        loading={loading}
        onClose={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(true)}
              disabled={loading}
            >
              <Trash className="w-5 h-5" />
            </Button>
          )
        }
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem
                className="flex flex-col"
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
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 gap-x-6"
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
              name='subcategoryId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Categoría
                  </FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Selecciona una subcategoría'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {
                        subcategories.map((item) => (
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
            <div>
              <div className="flex flex-col">
                <FormLabel>Tamaños</FormLabel>
                <FormDescription>
                  En caso de que el producto tenga diferentes tamaños, agregalos aquí
                </FormDescription>
                <div>
                  {
                    sizesFields.map((field, index) => (
                      <div
                        key={field.id}
                        className='flex flex-row space-x-4 mt-2'
                      >
                        <FormField
                          control={form.control}
                          name={`sizes.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tamaño</FormLabel>
                              <FormControl>
                                <Input placeholder="Chico" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`sizes.${index}.price`}
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
                        <Button
                          disabled={loading}
                          onClick={() => removeSize(index)}
                          variant='destructive'
                          size='sm'
                          type='button'
                          className='self-end py-5'
                          title='Eliminar tamaño'
                        >
                          <Trash className="w-5 h-5" />
                        </Button>
                      </div>
                    ))
                  }
                </div>
                <Button
                  disabled={loading}
                  onClick={() => appendSize({ name: '', price: 0 })}
                  type='button'
                  size='sm'
                  variant='secondary'
                  className="mt-2 w-fit"
                >
                  Agregar
                </Button>
              </div>
            </div>
            <div>
              <div className="flex flex-col">
                <FormLabel>Extras</FormLabel>
                <FormDescription>
                  En caso de que el producto tenga algún extra, agregalos aquí
                </FormDescription>
                <div>
                  {
                    extrasFields.map((field, index) => (
                      <div
                        key={field.id}
                        className='flex flex-row space-x-4 mt-2'
                      >
                        <FormField
                          control={form.control}
                          name={`extras.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Extra</FormLabel>
                              <FormControl>
                                <Input placeholder="Vainilla" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`extras.${index}.price`}
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
                        <Button
                          disabled={loading}
                          onClick={() => removeExtra(index)}
                          variant='destructive'
                          size='sm'
                          type='button'
                          className='self-end py-5'
                          title='Eliminar tamaño'
                        >
                          <Trash className="w-5 h-5" />
                        </Button>
                      </div>
                    ))
                  }
                </div>
                <Button
                  disabled={loading}
                  onClick={() => appendExtra({ name: '', price: 0 })}
                  type='button'
                  size='sm'
                  variant='secondary'
                  className="mt-2 w-fit"
                >
                  Agregar
                </Button>
              </div>
            </div>
            <FormField
              control={form.control}
              name='isPromo'
              render={({ field }) => (
                <FormItem
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 h-fit'
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value}
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
                  name="promoPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descuento</FormLabel>
                      <FormControl>
                        <Input placeholder="1230" type='number' {...field} />
                      </FormControl>
                      <FormDescription>
                        Este va a ser el nuevo precio del producto
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
                  className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 h-fit'
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
            disabled={loading}
            className='mt-5'
            type='submit'
          >
            {buttonText}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default ProductForm