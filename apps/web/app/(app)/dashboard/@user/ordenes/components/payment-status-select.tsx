"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Order, OrderPaymentStatus } from "@prisma/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useUser } from "@/utils/user"
import BadgePaymentStatus from "./badge-payment-status"
import axios from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  state: z.enum(['PENDING', 'PAID']),
})

const PaymentStatusSelect = ({ order }: { order: Order }) => {
  const [loading, setLoading] = useState(false)
  const user = useUser()
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      state: order.paymentStatus,
    }
  })

  async function handleChange(value: OrderPaymentStatus) {
    const data = {
      paymentStatus: value
    }
    try {
      setLoading(true)
      await axios.patch(`/api/${user.slug}/orders/${order.id}`, data)
      toast.success('Pago actualizado')
      router.refresh()
    } catch (error: any) {
      toast.error('Algo salió mal')
    } finally {
      setLoading(false)
    }
  }

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
                  handleChange(value as OrderPaymentStatus)
                }}
                defaultValue={order.paymentStatus}
                disabled={loading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Estado de la orden" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    Object.values(OrderPaymentStatus).map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        disabled={loading}
                      >
                        <BadgePaymentStatus orderPaymentStatus={item} />
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

export default PaymentStatusSelect