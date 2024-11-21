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
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const formSchema = z.object({
  projectName: z.string().min(3, {
    message: "name needs to be atleast 3 characters"
  }).max(30, {
    message: "Title must be 100 characters or less.",
  }),
  projectSlug: z.string().min(3, {
    message: "slug needs to be atleast 3 characters"
  }).max(30, {
    message: "Description must be 500 characters or less.",
  })
})

{/*
improve the preview along with create two seperate previews components, to showcase in this and the last component
*/}

export const SpaceCreationDetails = () => {
  const router = useRouter()
  const params = useSearchParams()
  const paramsError = params.get("error")
  const [error, setError] = useState<null | string>(null)
  const { spaceCreationDetails: spaceCreationDetailsState, setSpaceCreationDetails } = useSpaceDataStore()

  useEffect(() => {
    console.log({ params })
    if (paramsError === "missingDetails")
      setError("you need to add these fields to save this space")
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      projectSlug: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (spaceCreationDetailsState.projectSlug === null || spaceCreationDetailsState.projectName === null || spaceCreationDetailsState.projectName.length === 0 || spaceCreationDetailsState.projectSlug.length === 0) {
    }
    setSpaceCreationDetails(values)
    router.push("/space/create?page=2")
  }

  return (
    <div className="w-full max-h-screen h-full flex justify-center items-center gap-4">
      <div className="w-1/2 space-y-6">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold">It is really simple</h1>
          <p>
            This page will not be visible to your customers, it is for creating this space for you
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="What is your project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WRITE A DESCRIPTION</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a unique slug for generating a URL for your space" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        {error && (
          <p className="text-sm text-red-600">*{error}*</p>
        )}
        <Button type="submit" className="w-full" onClick={form.handleSubmit(onSubmit)}>
          Next
        </Button>
      </div>
    </div>
  )
}


