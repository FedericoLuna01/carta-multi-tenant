"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "El email es requerido" })
    .max(50)
    .email({ message: "El email no es válido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .max(50),
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", {
        email: data.email,
        password: data.password.trim(),
      });
      if (res.status === 200) {
        router.push("/admin");
        toast.success("Sesión iniciada correctamente.");
      }
    } catch (error: any) {
      toast.error(error.response.data);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-input p-4 rounded-md space-y-2"
      >
        <h1 className="font-bold text-2xl text-center">Ingresar a Carta</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="ejemplo@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input placeholder="*********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-5 w-full" type="submit" disabled={loading}>
          Ingresar
        </Button>
        <p className="text-xs">
          En caso de no poder ingresar comunicarse con{" "}
          <Link href="#" className="text-blue-500 hover:underline">
            Carta
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
