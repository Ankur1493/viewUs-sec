"use client"; // Add this at the top

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { useRef } from "react";
import useReviewPageStore from "@/store/useReviewPageStore";

const FormSchema = z.object({
  FirstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  LastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  image: z
    .any()
    .refine((file) => file instanceof File, "Please upload an image file.")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file?.type),
      "Only .jpg or .png files are accepted."
    ),
  email: z.string().email(),
  company: z.string().min(3, {
    message: "Company must be at least 3 characters.",
  }),
  jobTitle: z.string().min(2, {
    message: "Job Title must be at least 2 characters.",
  }),
});

export const CustomerDetailCard = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    defaultValues: {
      FirstName: "",
      LastName: "",
      image: undefined,
      email: "",
      company: "",
      jobTitle: "",
    },
  });

  const {
    detailsButton,
    setDetailsButton,
    textReview,
    starred,
    setSubmitButton,
    submitButton,
  } = useReviewPageStore();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    // const formData = new FormData();
    // formData.append("name", data.name);
    // formData.append("email", data.email);
    // formData.append("description", data.description);
    // if (data.image) formData.append("image", data.image);
    // formData.append("textReview", textReview);
    // formData.append("starred", JSON.stringify(starred));

    // try {
    //   const response = await fetch("/api/review/text", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const result = await response.json();
    //   console.log("Submission result:", result);
    // } catch (error) {
    //   console.error("Submission error:", error);
    // }
    console.log({ starred });
    console.log({ textReview });
    console.log({ data });
    console.log({ submitButton });
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      form.setValue("image", file);
    }
  };

  return (
    <Card className="relative w-[550px] px-[2%] h-[80%] border-none shadow-none">
      <div className="absolute top-2 right-2">
        {" "}
        <Button
          variant="outline"
          onClick={() => {
            setDetailsButton(!detailsButton);
          }}
          className="shadow-md"
        >
          <ArrowLeft size={24} />
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="text-center text-[#33313B]">
          Tell us about yourself
        </CardTitle>
        <CardDescription>This information may be displayed with your testimonial.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-3"
          >
            <FormField
              control={form.control}
              name="image"
              render={({ fieldState }) => (
                <FormItem>
                  <FormLabel>Add a photo</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden">
                        {selectedImage ? (
                          <Image
                            src={selectedImage}
                            alt="Selected Image"
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-300 rounded-full" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="rounded-3xl border-gray-400"
                        >
                          {selectedImage ? "Upload Again" : "Upload photo"}
                        </Button>

                        <input
                          ref={fileInputRef}
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>
                  </FormControl>
                  {fieldState.error && (
                    <FormMessage>{fieldState.error.message}</FormMessage>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="FirstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Udit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="LastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Kapoor" {...field} />
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
                  <FormLabel>Enter your email<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="udit123@gmail.com" {...field} />
                  </FormControl>
                  <div className="text-xs pt-0 font-light">Your email will not be shared publically</div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Apple" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title<span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="Software Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
            <Button
              type="submit"
              variant="form"
              onClick={() => setSubmitButton(!submitButton)}
              className="w-2/6 py-5"
            >
              Continue
            </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
