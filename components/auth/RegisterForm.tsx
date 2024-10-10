"use client"
import { useState, useTransition } from "react"
import { AuthWrapper } from "./AuthWrapper"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerSchema } from "@/schemas/register"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { FormError } from "./FormError"
import { register } from "@/actions/register"

export const RegisterForm = () => {

  const [error, setError] = useState("")
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })
  function onSubmit(values: z.infer<typeof registerSchema>) {
    setError("")
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data?.error ?? "");
        })
    });
  }


  return (
    <div className="w-screen min-h-screen h-full flex justify-center items-center">
      <AuthWrapper headerLabel="Create an Account!!" backLabel="Already have an account?" backLabel2="Sign In" backLabelHref="/login">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Ankur Sharma" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="ankursharma1493@gmail.com" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="How dare you ask me my password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button disabled={isPending} className="w-full bg-[#71D4FF] text-black rounded-3xl py-3 hover:bg-[#71D4FF] hover:bg-opacity-80" type="submit">Register</Button>
          </form>
        </Form>
      </AuthWrapper>
    </div>
  )
}
