"use client";

import { useSpaceDataStore } from "@/store/useSpaceDataStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Trash2Icon, PlusCircle, ChevronDown } from "lucide-react";
import { WrittenTestimonialPreview } from "./preview/WrittenTestimonialPreview";
import { VideoReviewPreview } from "./preview/VideoReviewPreview";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

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
];

const formSchema = z.object({
  title: z.string().max(100, {
    message: "Title must be 100 characters or less.",
  }),
  description: z.string().max(500, {
    message: "Description must be 500 characters or less.",
  }),
  tags: z.string().array().max(10, {
    message: "tags cannot be more than 10",
  }),
  questionHeader: z
    .string()
    .min(10, {
      message: "Header should be atleast 10 characters",
    })
    .max(100, {
      message: "Header cannot exceed 100 characters",
    }),
  questions: z.string().array().max(5, {
    message: "question cannot be more than 5",
  }),
});

{
  /*
improve the preview along with create two seperate previews components, to showcase in this and the last component
*/
}
const sanitizeTag = (tag: string) => tag.trim();

export const TestimonialPage = () => {
  const { testimonialPageType, setTestimonialPageType, testimonialType } =
    useSpaceDataStore();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: testimonialPageType.title,
      description: testimonialPageType.description,
      tags: testimonialPageType.tags || [],
      questionHeader:
        testimonialPageType.questionHeader || "Tell us about your experience",
      questions: testimonialPageType.questions,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTestimonialPageType(values);
    router.push("/space/create?page=6");
  }

  const toggleTag = (tag: string) => {
    const currentTags = form.getValues("tags");
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];
    form.setValue("tags", newTags);
  };

  const addTag = (newTag: string) => {
    const sanitizedTag = sanitizeTag(newTag);
    if (
      sanitizedTag &&
      form.getValues("tags").length < 10 &&
      !form.getValues("tags").includes(sanitizedTag)
    ) {
      form.setValue("tags", [...form.getValues("tags"), sanitizedTag]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      addTag(input.value);
      input.value = "";
    }
  };

  const addNewQuestion = () => {
    const currentQuestions = form.getValues("questions");
    if (currentQuestions.length < 5) {
      form.setValue("questions", [...currentQuestions, ""]);
    }
  };
  const [view, setView] = useState<"text" | "video">(
    testimonialType.text ? "text" : "video"
  );

  return (
    <div className="w-full pl-2 max-h-screen h-[85vh] flex justify-center overflow-hidden gap-4">
      <div className="max-w-[448px] h-full space-y-6 px-6 pt-5 overflow-y-auto scrollbar-hidden">
        <div className="flex-grow">
          <h2 className="text-[36px] font-medium">
            Let’s work on your testimonial page
          </h2>
          <p className="text-[16px] font-normal">
            Add a message and choose what you want to include on your customers’
            testimonials.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 pt-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[14px] p-2">
                      ADD A PAGE TITLE
                    </FormLabel>
                    <FormControl>
                      <Input placeholder={`Add a title`} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {testimonialType.text && (
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
              )}
              <FormField
                control={form.control}
                name="tags"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-[12px] font-bold">
                      SELECT UP TO 10 TESTIMONIAL TAGS
                    </FormLabel>
                    <p className="text-[13px] font-normal">
                      You&apos;ve selected {form.watch("tags").length} out of
                      10.
                    </p>

                    <div className="flex flex-col">
                      {" "}
                      <div className="flex flex-wrap gap-2">
                        {DEFAULT_TAGS.map((tag) => {
                          const isSelected = form.watch("tags").includes(tag);
                          return (
                            <div
                              key={tag}
                              className={cn(
                                "cursor-pointer text-[14px] font-normal px-2 py-1 rounded-full",
                                isSelected
                                  ? "bg-[#71D4FF] text-[#222222]"
                                  : "bg-[#EAEBEC] text-[#5C5D5E]",
                                form.watch("tags").length === 10 && !isSelected
                                  ? "cursor-disable"
                                  : ""
                              )}
                              onClick={() => {
                                if (
                                  form.watch("tags").length < 10 ||
                                  isSelected
                                )
                                  toggleTag(tag);
                              }}
                            >
                              {tag}
                            </div>
                          );
                        })}
                      </div>
                      {form.watch("tags").length < 10 && (
                        <div className="flex items-center gap-2 justify-center pt-2">
                          <PlusCircle
                            className="h-8 w-8 mr-1 text-black border-transparent cursor-pointer"
                            fill="#D0D1D2"
                            onClick={() => {
                              const input = document.querySelector(
                                "input[placeholder='Add a new tag']"
                              ) as HTMLInputElement;
                              addTag(input.value);
                              input.value = "";
                            }}
                          />
                          <Input
                            placeholder="Add a new tag"
                            onKeyDown={handleKeyDown}
                          />{" "}
                        </div>
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
                      <Input
                        placeholder="Tell us about your experience"
                        {...field}
                      />
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
                              const newQuestions = [
                                ...form.getValues("questions"),
                              ];
                              newQuestions[index] = e.target.value;
                              form.setValue("questions", newQuestions);
                            }}
                            placeholder="Enter your question"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              const newQuestions = form
                                .getValues("questions")
                                .filter((_, i) => i !== index);
                              form.setValue("questions", newQuestions);
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
      <div className="relative w-full h-[90%]">
        <div className="absolute z-50 top-2 w-full flex justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="flex gap-2 rounded-full border"
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
                <ChevronDown size={15} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
              <DropdownMenuItem
                onClick={() => setView("text")}
                className="cursor-pointer"
              >
                Text
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setView("video")}
                className="cursor-pointer"
              >
                Video
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="h-80%">
            {view === "text" ? (
              <WrittenTestimonialPreview
                title={form.watch("title")}
                description={form.watch("description")}
                tags={form.watch("tags")}
                questionHeader={form.watch("questionHeader")}
                questions={form.watch("questions")}
              />
            ) : (
              <VideoReviewPreview
                title={form.watch("title")}
                description={form.watch("description")}
                tags={form.watch("tags")}
                questionHeader={form.watch("questionHeader")}
                questions={form.watch("questions")}
              />
            )}
          </div>
          <div className="p-4 flex justify-center items-center">
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => router.push("/space/create?page=4")}
                variant="outline"
                className="border-[#DDDEDF] rounded-full px-20 py-4"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="form"
                onClick={form.handleSubmit(onSubmit)}
                className=" px-20 py-4"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
