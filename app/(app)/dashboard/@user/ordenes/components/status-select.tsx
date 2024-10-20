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
import { cn } from "@/lib/utils"
import axios from "axios"
import { useEffect, useState, useCallback } from "react"
import { useUser } from "@/utils/user"

const FormSchema = z.object({
  state: z.enum(['PENDING',
    'IN_PROGRESS',
    'ON_THE_WAY',
    'PAID',
    'READY',
    'DONE',
    'CANCELED']),
})

interface StatusSelectProps {
  order: Order
}

export function StatusSelect({ order }: StatusSelectProps) {
  // TODO: Arreglar este componente para poder usarlo.
  // Cuando llega una orden nueva, el estado de la siguiente orden, se duplica
  const [loading, setLoading] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(order.status)
  const user = useUser()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      state: currentStatus,
    }
  })

  useEffect(() => {
    setCurrentStatus(order.status);
    form.reset({ state: order.status });
  }, [order.status, form]);

  const handleChange = useCallback(async (value: OrderStatus) => {
    const data = {
      status: value
    }
    try {
      setLoading(true)
      await axios.patch(`/api/${user.slug}/orders/${order.id}`, data)
      setCurrentStatus(value)
      toast.success('Estado actualizado')
    } catch (error: any) {
      toast.error('Algo salió mal')
    } finally {
      setLoading(false)
    }
  }, [user.slug, order.id])

  const status = Object.values(OrderStatus).map(v => {
    if (v === 'PENDING') return { value: v, label: 'Pendiente' }
    if (v === 'IN_PROGRESS') return { value: v, label: 'En progreso' }
    if (v === 'ON_THE_WAY') return { value: v, label: 'En camino' }
    if (v === 'PAID') return { value: v, label: 'Pagado' }
    if (v === 'READY') return { value: v, label: 'Listo' }
    if (v === 'DONE') return { value: v, label: 'Entregado' }
    if (v === 'CANCELED') return { value: v, label: 'Cancelado' }
  })

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
                value={currentStatus}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado de la orden" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    status && status.map((item) => {
                      return (
                        <SelectItem
                          key={item.value}
                          value={item.value}
                          disabled={loading}
                        >
                          <p
                            className={cn('font-semibold text-center py-1 px-2 rounded-md border-2', {
                              'bg-yellow-200 border-yellow-400': item.value === 'PENDING',
                              'bg-orange-200 border-orange-400': item.value === 'IN_PROGRESS',
                              'bg-blue-200 border-blue-400': item.value === 'ON_THE_WAY',
                              'bg-green-200 border-green-400': item.value === 'PAID',
                              'bg-emerald-200 border-emerald-400': item.value === 'READY',
                              'bg-green-300 border-green-400': item.value === 'DONE',
                              'bg-red-200 border-red-400': item.value === 'CANCELED',
                            })}
                          >
                            {item.label}
                          </p>
                        </SelectItem>
                      )
                    })
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
