"use client"
import { useEffect, useState, useTransition } from "react"
import { AuthWrapper } from "@/components/auth/AuthWrapper"
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
import { loginSchema } from "@/schemas/login"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { FormError } from "./FormError"
import { login } from "@/actions/login"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

export const LoginForm = () => {

  const [error, setError] = useState("")
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  useEffect(() => {
    const authError = searchParams.get("error")
    if (authError) {
      if (authError === "OAuthAccountNotLinked")
        setError("Please login from same method")
      else {
        setError("please try again")
      }
    }
  }, [])

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError("")
    startTransition(() => {
      login(values)
        .then((data) => {
          setError(data?.error ?? "");
        })
    });
  }

  return (
    <div className="w-screen min-h-screen h-full flex justify-center items-center z-10">
      <AuthWrapper headerLabel="Welcome Back" backLabel="Don't have an account?" backLabel2="Register Now" backLabelHref="/register" oauth={true}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder=" ankursharma1493@gmail.com" {...field} />
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
                  <div className="flex w-full justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link href={"/forget-password"} className="text-xs text-red-500">Forgot Password?</Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="How dare you ask me my password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={error} />
            <Button disabled={isPending} className="w-full bg-[#71D4FF] text-black rounded-3xl py-3 hover:bg-[#71D4FF] hover:bg-opacity-80" type="submit">Login</Button>
          </form>
        </Form>
      </AuthWrapper>
    </div>
  )
}
