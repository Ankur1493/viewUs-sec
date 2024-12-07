"use client";

import { useSpaceDataStore } from "@/store/useSpaceDataStore";
import { useEffect, useState } from "react";
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
import { CoverPagePreview } from "./preview/CoverPagePreview";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().max(100, {
    message: "Title must be 100 characters or less.",
  }),
  description: z.string().max(500, {
    message: "Description must be 500 characters or less.",
  }),
  btnText: z.string().max(30, {
    message: "Button text must be 30 characters or less.",
  }),
  // logo: z
  //   .any()
  //   .refine((file) => !file || file instanceof File, "Invalid file")
  //   .refine(
  //     (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
  //     "Only .jpg, .jpeg, .png formats are supported."
  //   )
  //   .optional(),
});

export const CoverPage = ({
  name,
  slug,
  page,
}: {
  name?: string | undefined;
  slug?: string | undefined;
  page: "edit" | "create";
}) => {
  const { coverPage: coverPageData, setCoverPage } = useSpaceDataStore();
  // const [logoPreview, setLogoPreview] = useState<string | null>(null);

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
      title: coverPageData.title,
      description: coverPageData.description,
      btnText: coverPageData.btnText,
      // logo: coverPageData.logo || undefined,
    },
    values: {
      title: coverPageData.title || "",
      description: coverPageData.description || "",
      btnText: coverPageData.btnText || "",
      // logo: coverPageData.logo || undefined,
    },
  });

  // useEffect(() => {
  //   if (coverPageData.logo) {
  //     if (typeof coverPageData.logo === "string") {
  //       setLogoPreview(coverPageData.logo);
  //     } else if (coverPageData.logo instanceof File) {
  //       const url = URL.createObjectURL(coverPageData.logo);
  //       setLogoPreview(url);
  //       form.setValue("logo", coverPageData.logo);
  //       return () => URL.revokeObjectURL(url);
  //     }
  //   }
  // }, [coverPageData.logo, form]);

  // const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const fileUrl = URL.createObjectURL(file);
  //     console.log("helloo", fileUrl);

  //     setLogoPreview(fileUrl);
  //     form.setValue("logo", file, { shouldValidate: true });
  //     setCoverPage({
  //       ...coverPageData,
  //       logo: file,
  //     });
  //   }
  // };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log("image to be sent:", values.logo);
    // console.log("logo to be sent:", coverPageData.logo);
    setCoverPage({
      ...coverPageData,
      ...values,
    });

    if (page === "create") router.push("/space/create?page=3");
    else router.push(`/space/${slug}/edit?page=3`);
  }

  return (
    <div className=" relative w-full pl-2 max-h-screen h-[85vh] lg:flex justify-center overflow-hidden gap-4">
      <div
        className="absolute lg:hidden right-0 z-50"
        onClick={() => setIsHidden(!isHidden)}
      >
        {isHidden ? <Menu /> : <X />}
      </div>
      <div
        className={cn(
          "h-full space-y-6 md:px-6 pt-5 overflow-y-auto flex items-center justify-center lg:items-start",
          isHidden ? "hidden lg:block" : ""
        )}
      >
        <div className="flex-grow max-w-[448px]">
          <h1 className="text-2xl md:text-[36px] font-medium">
            Create your cover page
          </h1>
          <p className="text-sm md:text-[16px] font-normal text-[#222222] pt-2">
            This is the first page your users will see, so add a message to
            encourage them to leave a testimonial
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className=" pt-8 space-y-8"
            >
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
                        className="h-20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="btnText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ADD BUTTON TEXT</FormLabel>
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
              {/* <FormField
                control={form.control}
                name="logo"
                render={() => (
                  <FormItem>
                    <FormLabel>UPLOAD YOUR LOGO</FormLabel>
                    <FormControl>
                      <Input type="file" onChange={handleLogoChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </form>
          </Form>
        </div>
      </div>
      <div className="md:flex-1 md:relative h-full">
        <div className="md:absolute md:inset-0 h-full flex flex-col">
          <div className="flex-1 overflow-y-auto">
            <CoverPagePreview
              name={name}
              slug={slug}
              title={form.watch("title")}
              description={form.watch("description")}
              btnText={form.watch("btnText")}
              // logo={logoPreview}
            />
          </div>
          <div className="p-4 flex justify-center items-center">
            <div className="flex gap-4">
              <Button
                onClick={() => {
                  if (page === "create") router.push("/space/create?page=1");
                  else router.push(`/space/${slug}/edit?page=1`);
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
