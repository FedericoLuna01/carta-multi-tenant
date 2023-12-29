"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "../ui/input"
import { UserSettings } from "@prisma/client"

const FormSchema = z.object({
  dayOpenTime: z.string().min(1, { message: 'El horario es requerido' }),
  dayCloseTime: z.string().min(1, { message: 'El horario es requerido' }),
  nightOpenTime: z.string().min(1, { message: 'El horario es requerido' }),
  nightCloseTime: z.string().min(1, { message: 'El horario es requerido' }),
  ubication: z.string().min(1, 'La ubicación es requerida'),
  phone: z.string().min(1, 'El teléfono es requerido'),
  table: z.boolean(),
  delivery: z.boolean(),
  takeaway: z.boolean(),
})

export default function UserSettingsForm({ userSettings }: { userSettings: UserSettings | null }) {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: userSettings || {
      dayOpenTime: '',
      dayCloseTime: '',
      nightOpenTime: '',
      nightCloseTime: '',
      ubication: '',
      phone: '',
      table: false,
      delivery: false,
      takeaway: false,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true)
      await axios.patch('/api/usersettings', data)
      toast.success('Se guardaron los cambios')
    } catch (error) {
      toast.error('Algo salio mal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Horarios de tu local</h3>
          <div
            className="rounded-lg border p-3 shadow-sm"
          >
            <h4 className="font-semibold">Día</h4>
            <div
              className="flex items-start sm:items-center flex-col sm:flex-row space-y-2 sm:space-y-0"
            >
              <FormField
                control={form.control}
                name="dayOpenTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between mr-4">
                    <div className="space-x-2 flex items-center">
                      <FormLabel>Desde</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dayCloseTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <div className="space-x-2 flex items-center">
                      <FormLabel>Hasta</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div
            className="rounded-lg border p-3 shadow-sm mt-4"
          >
            <h4 className="font-semibold">Noche</h4>
            <div
              className="flex items-start sm:items-center flex-col sm:flex-row space-y-2 sm:space-y-0"
            >
              <FormField
                control={form.control}
                name="nightOpenTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between  mr-4">
                    <div className="space-x-2 flex items-center">
                      <FormLabel>Desde</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nightCloseTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col justify-between">
                    <div className="space-x-2 flex items-center">
                      <FormLabel>Hasta</FormLabel>
                      <FormControl>
                        <Input
                          type='time'
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium">Contacto</h3>
          <div
            className="space-y-4"
          >
            <div
              className="rounded-lg border p-3 shadow-sm"
            >
              <div
                className="flex items-center"
              >
                <FormField
                  control={form.control}
                  name="ubication"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="space-y-2">
                        <FormLabel>Ubicación</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ej: Av. Corrientes 1234"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div
              className="rounded-lg border p-3 shadow-sm"
            >
              <div
                className="flex items-center"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="space-y-2">
                        <FormLabel>Teléfono</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="+54 9 11 1234 5678"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-medium">Tipos de ordenes</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="table"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Mesa</FormLabel>
                    <FormDescription>
                      Tus clientes van a poder hacer su orden desde una mesa.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="delivery"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Delivery</FormLabel>
                    <FormDescription>
                      Tus clientes van a poder hacer su orden desde su casa.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="takeaway"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Takeaway</FormLabel>
                    <FormDescription>
                      Tus clientes van a poder retirar su pedido en tu local.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          disabled={loading}
        >
          Guardar
        </Button>
      </form>
    </Form>
  )
}
