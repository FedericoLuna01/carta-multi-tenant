"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { useState } from "react";
import toast from "react-hot-toast";
import { LoginSchema } from "@/schemas";
import { login } from "@/actions/auth/login";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      setLoading(true);
      login(data).then((res) => {
        setError(res?.error)
      });
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
        {
          error && <p className="text-red-500 bg-red-100 p-2 rounded-md text-center">{error}</p>
        }
        <p className="text-xs">
          En caso de no poder ingresar comunicarse con{" "}
          <a href="https://www.instagram.com/cartadigital.arg/" target="_blank" className="text-blue-500 hover:underline">
            Carta
          </a>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
