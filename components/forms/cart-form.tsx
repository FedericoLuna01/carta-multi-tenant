'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useUser from "@/hooks/use-user"
import { Button } from "../ui/button"
import CartProductsTable from "../cart-products-table"
import useCart from "@/hooks/use-cart"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(2).max(10),
  comment: z.string().max(50).optional(),
  type: z.enum(['DELIVERY', 'TAKEAWAY', 'TABLE']),
  place: z.string().max(50).optional(),
})

const CartForm = () => {
  const [loading, setLoading] = useState(false)

  const { user, setUser } = useUser()
  const { items, removeAll } = useCart()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      name: "",
      phone: "",
      comment: "",
      type: "DELIVERY",
      place: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, phone, comment, type, place } = values
    const formattedProducts = items.map(product => {
      return {
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
        options: product.options,
        extras: product.extras,
        size: product.size,
      }
    })
    const data = {
      name,
      phone,
      comment,
      type,
      place,
      products: formattedProducts
    }

    if(!items || items.length === 0) {
      return toast.error('No hay productos en el carrito')
    }

    // Valido que el usuario haya seleccionado un lugar si es delivery o mesa
    if(user?.type === 'TABLE' || user?.type === 'DELIVERY') {
      const place = form.getValues('place')
      if (!place) {
        return form.setError("place", { type: 'custom', message: 'El lugar es requerido' })
      }
    }

    try {
      setLoading(true)
      const res = await axios.post('/api/orders', data)

      // Guardar la orden en localstorage
      localStorage.setItem('orderId', res.data.order.id)

      window.location.reload()
      toast.success("Pedido realizado con éxito")
      removeAll()
    } catch (error: any) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full p-8 pt-0">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Federico Luna"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setUser({ ...user,
                      name: e.target.value,
                    })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de telefono</FormLabel>
              <FormControl>
                <Input
                  placeholder="+54 9 11 1234 5678"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setUser({ ...user,
                      phone: e.target.value
                    })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aclaraciones</FormLabel>
              <FormControl>
                <Input
                  placeholder="Sin cebolla..."
                  {...field}
                  onChange={(e) => {
                    field.onChange(e)
                    setUser({ ...user,
                      comment: e.target.value
                    })
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Tipo de orden</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value)
                      setUser({ ...user,
                        type: value as any
                      })
                    }}
                    defaultValue={user?.type}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value='DELIVERY' />
                      </FormControl>
                      <FormLabel>
                        Delivery
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value='TABLE' />
                      </FormControl>
                      <FormLabel>
                        Mesa
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value='TAKEAWAY' />
                      </FormControl>
                      <FormLabel>
                        Takeaway
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {
          user?.type === 'DELIVERY' || user?.type === 'TABLE' ?
            <FormField
              control={form.control}
              name="place"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección o Mesa</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="San martín 2153 / Mesa 3"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setUser({ ...user,
                          place: e.target.value
                        })
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            : null
        }
        <CartProductsTable />
        <div
          className='flex gap-4 flex-row justify-end pt-2'
        >
          <Button
            type='submit'
            size='lg'
            disabled={loading}
          >
            Pedir
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CartForm