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

const formSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(2).max(10),
  options: z.string().max(50).optional(),
  delivery: z.boolean().optional().default(false),
  address: z.string().max(50).optional(),
})

const CartForm = () => {
  const { user, setUser } = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user || {
      name: "",
      phone: "",
      options: "",
      delivery: false,
      address: ""
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data)
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
          name="options"
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
                      options: e.target.value
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
                  // @ts-ignore
                  onCheckedChange={field.onChange}
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
        {
          form.watch('delivery') && (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="San martín 2153"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        setUser({ ...user,
                          address: e.target.value
                        })
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )
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