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
import { Badge } from "@/components/ui/badge"
import { Trash2Icon, PlusCircle } from 'lucide-react'

const DEFAULT_TAGS = [
  "Easy to use",
  "UX/UI",
  "Provides result",
  "Great value",
  "Innovative",
  "Invaluable resource",
  "Time saver",
  "Great features",
  "Comprehensive",
  "Engaging",
  "Customer-focused",
  "Best-in-market",
  "Trustworthy",
  "Convenient",
  "Reliable",
  "Safety & security",
]


const formSchema = z.object({
  title: z.string().max(100, {
    message: "Title must be 100 characters or less.",
  }),
  description: z.string().max(500, {
    message: "Description must be 500 characters or less.",
  }),
  tags: z.string().array().max(10, {
    message: "tags cannot be more than 10"
  }),
  questionHeader: z.string().min(10, {
    message: "Header should be atleast 10 characters"
  }).max(100, {
    message: "Header cannot exceed 100 characters"
  }),
  questions: z.string().array().max(5, {
    message: "question cannot be more than 5"
  }),
})

{/*
improve the preview along with create two seperate previews components, to showcase in this and the last component
*/}

export const TestimonialPage = () => {
  const { testimonialPageType, setTestimonialPageType } = useSpaceDataStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: testimonialPageType.title,
      description: testimonialPageType.description,
      tags: testimonialPageType.tags || [],
      questionHeader: testimonialPageType.questionHeader || "Tell us about your experience",
      questions: testimonialPageType.questions,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTestimonialPageType(values)
    router.push("/space/create?page=6")
  }

  const toggleTag = (tag: string) => {
    const currentTags = form.getValues("tags")
    const newTags = currentTags.includes(tag)
      ? currentTags.filter(t => t !== tag)
      : [...currentTags, tag]
    form.setValue("tags", newTags)
  }

  const addNewQuestion = () => {
    const currentQuestions = form.getValues("questions")
    if (currentQuestions.length < 5) {
      form.setValue("questions", [...currentQuestions, ""])
    }
  }

  return (
    <div className="w-full max-h-screen h-full flex justify-center items-center gap-4">
      <div className="w-1/2 space-y-6">
        <div className="w-3/4">
          <h1 className="text-2xl font-bold">Create your Testimonial Page</h1>
          <p>
            Edit krlio bhai, jaise design m ho
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

              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel>SELECT UP TO 10 TESTIMONIAL TAGS</FormLabel>
                    <div className="flex flex-wrap gap-2">
                      {DEFAULT_TAGS.map((tag) => {
                        const isSelected = form.watch("tags").includes(tag)
                        return (
                          <Badge
                            key={tag}
                            variant={isSelected ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleTag(tag)}
                          >
                            {tag}
                          </Badge>
                        )
                      })}
                      {form.watch("tags").length < 10 && (
                        <Badge
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => {
                            const newTag = window.prompt("Enter new tag")
                            if (newTag) toggleTag(newTag)
                          }}
                        >
                          <PlusCircle className="h-4 w-4 mr-1" />
                          Add another tag
                        </Badge>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questionHeader"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QUESTION HEADER</FormLabel>
                    <FormControl>
                      <Input placeholder="Tell us about your experience" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="questions"
                render={() => (
                  <FormItem>
                    <FormLabel className="flex justify-between">
                      ADD QUESTIONS
                    </FormLabel>
                    <div className="space-y-2">
                      {form.watch("questions").map((question, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={question}
                            onChange={(e) => {
                              const newQuestions = [...form.getValues("questions")]
                              newQuestions[index] = e.target.value
                              form.setValue("questions", newQuestions)
                            }}
                            placeholder="Enter your question"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newQuestions = form.getValues("questions").filter((_, i) => i !== index)
                              form.setValue("questions", newQuestions)
                            }}
                          >
                            <Trash2Icon className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {form.watch("questions").length < 5 && (
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={addNewQuestion}
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add question
                        </Button>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
      <div className="w-1/2">
        <div className="bg-muted p-6 rounded-lg">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{form.watch("title")}</h3>
            <p className="text-sm text-muted-foreground">{form.watch("description")}</p>
            <div className="flex flex-wrap gap-2">
              {form.watch("tags").map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">{form.watch("questionHeader")}</h4>
              <ul className="space-y-2 list-disc list-inside">
                {form.watch("questions").map((question, index) => (
                  <li key={index} className="text-sm text-muted-foreground">
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={() => { router.push("/space/create?page=4") }} variant="outline">Back</Button>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}


