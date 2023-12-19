'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import useUser from "@/hooks/use-user"
import { Button } from "../ui/button"
import CartProductsTable from "../cart-products-table"
import { Checkbox } from "../ui/checkbox"
import useCart from "@/hooks/use-cart"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(2).max(10),
  comment: z.string().max(50).optional(),
  delivery: z.boolean().optional().default(false),
  table: z.boolean().optional().default(false),
  place: z.string().max(50).optional(),
})

const CartForm = () => {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { user, setUser } = useUser()
  const { items } = useCart()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      name: "",
      phone: "",
      comment: "",
      delivery: false,
      place: ""
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, phone, comment, delivery, table, place } = values
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
      delivery,
      table,
      place,
      products: formattedProducts
    }
    console.log(data)

    try {
      setLoading(true)
      await axios.post('/api/orders', data)
      // router.push('/admin/productos')
      // router.refresh()
      toast.success("Pedido realizado con éxito")
    } catch (error: any) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full">
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
        <FormField
          control={form.control}
          name='delivery'
          render={({ field }) => (
            <FormItem
              className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'
            >
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e)
                    if (e) {
                      form.setValue('table', false)
                      setUser({ ...user,
                        table: false,
                        delivery: true,
                      })
                    } else {
                      setUser({ ...user,
                        delivery: false,
                      })
                    }
                  }}
                />
              </FormControl>
              <div
                className='space-y-1 leading-none'
              >
                <FormLabel>
                  Delivery
                </FormLabel>
                <FormDescription>
                  El pedido es para llevar?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='table'
          render={({ field }) => (
            <FormItem
              className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'
            >
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(e) => {
                    field.onChange(e)
                    if (e) {
                      form.setValue('delivery', false)
                      setUser({ ...user,
                        delivery: false,
                        table: true,
                      })
                    } else {
                      setUser({ ...user,
                        table: false,
                      })
                    }
                  }}
                />
              </FormControl>
              <div
                className='space-y-1 leading-none'
              >
                <FormLabel>
                  Mesa
                </FormLabel>
                <FormDescription>
                  El pedido se está haciendo desde el restaurant?
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        {
          form.watch('delivery') || form.watch('table') ? (
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
          ) :
            null
        }
        <CartProductsTable />
        <div
          className='flex gap-4 flex-row justify-end pt-2'
        >
          <Button
            type='submit'
            size='lg'
          >
            Pedir
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CartForm