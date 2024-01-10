'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import toast from "react-hot-toast"
import { useEffect, useState } from "react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import useProductModal from "@/hooks/use-product-modal"
import useCart from "@/hooks/use-cart"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { formatter } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import { type FullProduct } from "@/types/types"

const formSchema = z.object({
  quantity: z
    .coerce
    .number()
    .min(0, { message: 'El número debe ser mayor a 0' })
    .max(100),
  options: z
    .string()
    .max(50, { message: 'No debe superar los 50 caracteres.' })
    .optional(),
  size: z
    .object(
      {
        name: z.string(),
        price: z.number(),
      }
    )
    .optional(),
  extras: z
    .array(
      z.object(
        {
          name: z.string(),
          price: z.number(),
        }
      )
    )
    .optional()
})


interface AddProductFormProps {
  data: FullProduct
}

const AddProductForm: React.FC<AddProductFormProps> = ({ data }) => {
  const [totalPrice, setTotalPrice] = useState(0)
  const { onClose } = useProductModal()
  const { addItem, items } = useCart()

  // Check si el item ya está en el carrito
  const existingItem = items.find(item => item.id === data.id)
  const updatedInfo = existingItem ? {
    quantity: existingItem.quantity,
    options: existingItem.options,
    size: existingItem.size,
    extras: existingItem.extras,
  } : undefined

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // Si el item ya está en el carrito, setear la cantidad y opciones
    defaultValues: updatedInfo || {
      quantity: 1,
      options: "",
      size: data.sizes ? data.sizes[0] : undefined,
      extras: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addItem({
      ...data,
      quantity: values.quantity,
      options: values.options,
      size: values.size,
      extras: values.extras,
    })
    onClose()
  }

  const handleAddQuantity = (value: number) => {
    if (value >= 100) {
      return toast.error('La cantidad debe ser menor a 100')

    }
    form.setValue('quantity', value + 1)
  }

  const handleDownQuantity = (value: number) => {
    if (value <= 1) {
      return toast.error('La cantidad debe ser mayor a 0')
    }
    form.setValue('quantity', value - 1)
  }


  // Actualizar el precio total del producto
  useEffect(() => {
    const totalProductPrice = () => {
      const extrasPrice = form.getValues('extras')?.reduce((acc, item) => acc + item.price, 0) || 0
      const sizePrice = form.getValues('size')?.price || 0
      const quantity = form.getValues('quantity') || 0

      if(sizePrice === 0) {
        if (data.isPromo) {
          return (extrasPrice + data.promoPrice) * quantity
        }
        return (extrasPrice + data.price) * quantity
      }

      return (extrasPrice + sizePrice) * quantity
    }

    setTotalPrice(totalProductPrice())

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch('quantity'), form.watch('extras'), form.watch('size')])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cantidad</FormLabel>
              <FormControl>
                <div
                  className="flex flex-row justify-center sm:justify-start gap-4"
                >
                  <Button
                    type='button'
                    size='icon'
                    variant='outline'
                    onClick={() => handleDownQuantity(field.value)}
                  >
                    -
                  </Button>
                  <div
                    className="flex items-center justify-center border border-input rounded-md w-10"
                  >
                    <p
                      className="text-center"
                    >
                      {field.value}
                    </p>
                  </div>
                  <Button
                    type='button'
                    size='icon'
                    variant='outline'
                    onClick={() => handleAddQuantity(field.value)}
                  >
                    +
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {
          data.sizes && data.sizes.length > 0 && (
            <div>
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Tamaño</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          if (!data.sizes) return
                          const size = data.sizes.find(size => size.name === value)
                          form.setValue('size', size)
                        }}
                        defaultValue={field.value?.name}
                        className="flex items-center sm:items-start flex-col space-y-1"
                      >
                        {
                          data.sizes && data.sizes.map((size, index) => (
                            <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                              <FormControl>
                                <RadioGroupItem value={size.name} />
                              </FormControl>
                              <FormLabel>
                                {size.name} - {formatter.format(size.price)}
                              </FormLabel>
                            </FormItem>
                          ))
                        }
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )
        }
        {
          data.extras && data.extras.length > 0 && (
            <FormField
              control={form.control}
              name="extras"
              render={() => (
                <div
                  className='space-y-3 mt-5'
                >
                  <FormLabel>Extras</FormLabel>
                  {
                    data.extras?.map((item) => (
                      <FormField
                        key={item.name}
                        control={form.control}
                        name="extras"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.name}
                              className="flex flex-row items-center justify-center sm:justify-start space-x-3 space-y-5"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={
                                    field.value?.find(
                                      (value) => value.name === item.name
                                    )
                                      ? true
                                      : false
                                  }
                                  onCheckedChange={(checked) => {
                                    if (!field.value) return field.onChange([item])
                                    return checked
                                      ? field.onChange([...field.value, item])
                                      : field.onChange(
                                        field.value?.filter(
                                          (value) => value.name !== item.name
                                        )
                                      )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal" style={{ marginTop: 0 }}>
                                {item.name} - {formatter.format(item.price)}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))
                  }
                </div>
              )}
            />
          )
        }
        <div>
          <p
            className="text-lg font-bold text-black"
          >
            Total: {formatter.format(totalPrice)}
          </p>
        </div>
        <FormField
          control={form.control}
          name="options"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aclaraciones</FormLabel>
              <FormControl>
                <Input placeholder="Sin cebolla..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div
          className='mt-4 flex gap-4'
        >
          <Button
            type='button'
            variant='secondary'
            className="w-1/2"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type='submit'
            className="w-1/2"
          >
            Agregar
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default AddProductForm