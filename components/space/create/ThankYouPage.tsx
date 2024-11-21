"use client"

import { useSpaceDataStore } from "@/store/useSpaceDataStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  title: z.string().max(100, {
    message: "Title must be 100 characters or less.",
  }),
  description: z.string().max(500, {
    message: "Description must be 500 characters or less.",
  }),
})

export const ThankYouPage = () => {
  const { thankyou, setThankYou } = useSpaceDataStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: thankyou.title,
      description: thankyou.description,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setThankYou(values)
    router.push("/space/create?page=6")
  }

  return (
    <div className="w-full max-h-screen h-full flex justify-center items-center gap-4">
      <div className="w-1/2 space-y-6">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold">Create your cover page</h1>
          <p>
            This is the first page your users will see, so add a message to encourage them to leave a testimonial
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ADD A PAGE TITLE</FormLabel>
                    <FormControl>
                      <Input placeholder="Leave us a testimonial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WRITE A DESCRIPTION</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="We want to share customer success stories on our website and would love for you to submit a written or video testimonial. Your feedback means a lot to us!"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div className="w-1/2">
        <div className=" bg-muted p-6 rounded-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{form.watch("title")}</h3>
            <p className="text-sm text-muted-foreground">{form.watch("description")}</p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={() => { router.push("/space/create?page=4") }} variant="outline">Back</Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Next</Button>
        </div>
      </div>
    </div>
  )
}
