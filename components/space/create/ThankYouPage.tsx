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
import { ThankYouPagePreview } from "./preview/ThankYouPagePreview";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().max(100, {
    message: "Title must be 100 characters or less.",
  }),
  description: z.string().max(500, {
    message: "Description must be 500 characters or less.",
  }),
});

export const ThankYouPage = ({
  slug,
  page,
}: {
  slug?: string | undefined;
  page: "edit" | "create";
}) => {
  const { thankyou, setThankYou } = useSpaceDataStore();
  const initializeSpaceData = useSpaceDataStore(
    (state) => state.initializeSpaceData
  );

  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    initializeSpaceData();
    console.log("runned");
  }, [initializeSpaceData]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: thankyou.title,
      description: thankyou.description,
    },
    values: {
      title: thankyou.title || "",
      description: thankyou.description || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setThankYou(values);
    if (page === "create") router.push("/space/create?page=7");
    else router.push(`/space/${slug}/edit?page=7`);
  }

  return (
    <div className="relative w-full pl-2 max-h-screen h-[85vh] lg:flex justify-center overflow-hidden gap-4">
      <div
        className="absolute lg:hidden right-0 z-50"
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? <Menu /> : <X />}
      </div>
      <div
        className={cn(
          " h-full space-y-6 px-6 pt-5 overflow-y-auto flex items-center justify-center lg:items-start",
          isHidden ? "hidden lg:block" : ""
        )}
      >
        <div className="flex-grow max-w-[448px]">
          <h1 className="text-2xl md:text-[36px] font-medium">
            Create your Thank page
          </h1>
          <p className="text-sm md:text-[16px] font-normal pt-4">
            This is the first page your users will see, so add a message to
            encourage them to leave a testimonial.{" "}
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 pt-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm md:text-[14px] p-2">
                      ADD A PAGE TITLE
                    </FormLabel>
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
                    <FormLabel className="text-sm md:text-[14px] p-2">
                      WRITE A DESCRIPTION
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="text-sm md:text-md"
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
      <div className="md:flex-1 md:relative h-full">
        <div className="md:absolute md:inset-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <ThankYouPagePreview
              title={form.watch("title")}
              description={form.watch("description")}
            />
          </div>
          <div className="p-4 flex justify-center items-center">
            <div className="flex justify-between gap-4">
              <Button
                onClick={() => {
                  if (page === "create") router.push("/space/create?page=4");
                  else router.push(`/space/${slug}/edit?page=4`);
                }}
                variant="outline"
                className="border-[#DDDEDF] rounded-full px-12 md:px-20 py-4"
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="form"
                onClick={form.handleSubmit(onSubmit)}
                className="px-12 md:px-20 py-4"
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
