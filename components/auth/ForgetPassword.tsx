"use client"
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

export const ForgetPasswordForm = () => {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
  }

  return (
    <div className="w-screen min-h-screen h-full flex justify-center items-center z-10">
      <AuthWrapper headerLabel="Forgot Password?" backLabel="Do not want to change your password" backLabel2="Go to Login" backLabelHref="/register" oauth={false}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full bg-[#71D4FF] text-black rounded-3xl py-3 hover:bg-[#71D4FF] hover:bg-opacity-80" type="submit">Login</Button>
          </form>
        </Form>
      </AuthWrapper>
    </div>
  )
}
