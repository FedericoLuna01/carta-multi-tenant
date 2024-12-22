"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import toast from "react-hot-toast"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Order, OrderStatus } from "@prisma/client"
import axios from "axios"
import { useState, useCallback } from "react"
import { useUser } from "@/utils/user"
import BadgeOrderStatus from "./badge-order-status"
import { useRouter } from "next/navigation"
import socket from "@/lib/socketio"

const FormSchema = z.object({
  state: z.enum(['PENDING',
    'IN_PROGRESS',
    'ON_THE_WAY',
    'READY',
    'DONE',
    'CANCELED']),
})

export function StatusSelect({ order }: { order: Order }) {
  const [loading, setLoading] = useState(false)
  const user = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      state: order.status,
    }
  })

  const handleChange = useCallback(async (value: OrderStatus) => {
    const data = {
      status: value
    }
    try {
      setLoading(true)
      await axios.patch(`/api/${user.slug}/orders/${order.id}`, data)
      socket.emit("updateOrder", { ...order, status: value })
      toast.success('Estado actualizado')
      router.refresh()
    } catch (error: any) {
      toast.error('Algo salió mal')
    } finally {
      setLoading(false)
    }
  }, [user.slug, router, order])

  return (
    <Form {...form}>
      <form className="max-w-[150px]">
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  handleChange(value as OrderStatus)
                }}
                defaultValue={order.status}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado de la orden" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    Object.values(OrderStatus).map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        disabled={loading}
                      >
                        <BadgeOrderStatus orderStatus={item} />
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
