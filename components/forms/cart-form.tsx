"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import userOrderUser from "@/hooks/use-order-user";
import { Button } from "../ui/button";
import CartProductsTable from "../cart-products-table";
import useCart from "@/hooks/use-cart";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { OrderType, UserSettings } from "@prisma/client";
import { getIsOpen } from "@/actions/getIsOpen";
import { SuccessOrderModal } from "../modals/success-order-modal";
import { OrderSchema } from "@/schemas";
import { useParams } from "next/navigation";


const CartForm = ({ userSettings }: { userSettings: UserSettings | null }) => {
  const [loading, setLoading] = useState(false);
  const [successModalState, setSuccessModalState] = useState(false);

  const params = useParams()
  const { user, setUser } = userOrderUser();
  const { items, removeAll } = useCart();

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: user || {
      name: "",
      phone: "",
      comment: "",
      type: "DELIVERY",
      place: "",
    },
  });

  async function onSubmit(values: z.infer<typeof OrderSchema>) {
    const { name, phone, comment, type, place } = values;
    const formattedProducts = items.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
        options: product.options,
        extras: product.extras,
        size: product.size,
      };
    });
    const data = {
      name,
      phone,
      comment,
      type,
      place,
      products: formattedProducts,
    };

    // Valido que el usuario haya seleccionado un lugar si es delivery o mesa
    if (user?.type === "TABLE" || user?.type === "DELIVERY") {
      const place = form.getValues("place");
      if (!place) {
        return form.setError("place", {
          type: "custom",
          message: "El lugar es requerido",
        });
      }
    }

    if (!items || items.length === 0) {
      return toast.error("No hay productos en el carrito");
    }

    const isOpen = getIsOpen(userSettings);
    if (!isOpen) {
      return toast.error("El local se encuentra cerrado");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${process.env.DOMAIN_URL || "http://localhost:3000"}/api/${params.slug}/orders`, data);
      // Guardar la orden en local storage
      localStorage.setItem("orderId", res.data.id);

      setSuccessModalState(true);
      removeAll();

      setTimeout(() => {
        window.location.reload();
      }, 6000);
    } catch (error: any) {
      console.log(error)
      toast.error("Algo salio mal");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SuccessOrderModal
        isOpen={successModalState}
        onClose={() => setSuccessModalState(false)}
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 p-8 pt-0 max-w-screen sm:max-w-[490px] md:max-w-[700px] xl:max-w-[800px] overflow-auto"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Juan Pérez"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUser({ ...user, name: e.target.value });
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
                <FormLabel>Número de teléfono</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+54 9 11 1234 5678"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setUser({ ...user, phone: e.target.value });
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
                      field.onChange(e);
                      setUser({ ...user, comment: e.target.value });
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
                        field.onChange(value);
                        setUser({ ...user, type: value as OrderType });
                      }}
                      defaultValue={user?.type}
                      className="flex flex-col space-y-1"
                    >
                      {userSettings?.delivery && (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="DELIVERY" />
                          </FormControl>
                          <FormLabel>Delivery</FormLabel>
                        </FormItem>
                      )}
                      {userSettings?.table && (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="TABLE" />
                          </FormControl>
                          <FormLabel>Mesa</FormLabel>
                        </FormItem>
                      )}
                      {userSettings?.takeaway && (
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="TAKEAWAY" />
                          </FormControl>
                          <FormLabel>Takeaway</FormLabel>
                        </FormItem>
                      )}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {user?.type === "DELIVERY" || user?.type === "TABLE" ? (
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
                        field.onChange(e);
                        setUser({ ...user, place: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <div>
            <CartProductsTable />
          </div>
          <div className="flex gap-4 flex-row justify-end pt-2">
            <Button type="submit" size="lg" disabled={loading}>
              Pedir
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default CartForm;
