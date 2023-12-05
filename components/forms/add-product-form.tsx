'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

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
import toast from "react-hot-toast"
import useProductModal from "@/hooks/use-product-modal"
import useCart from "@/hooks/use-cart"
import { Product } from "@/types/types"

const formSchema = z.object({
  quantity: z.coerce.number().min(0, { message: 'El número debe ser mayor a 0' }).max(100),
  options: z.string().max(50, { message: 'No debe superar los 50 caracteres.' }).optional(),
})


interface AddProductFormProps {
  data: Product
}

const AddProductForm: React.FC<AddProductFormProps> = ({ data }) => {
  const { onClose } = useProductModal()
  const { addItem, items } = useCart()

  const existingItem = items.find(item => item.id === data.id)
  const updatedInfo = existingItem ? {
    quantity: existingItem?.quantity,
    options: existingItem?.options,
  } : undefined

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: updatedInfo || {
      quantity: 1,
      options: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    addItem({
      ...data,
      quantity: values.quantity,
      options: values.options,
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
                  className="flex flex-row gap-4"
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