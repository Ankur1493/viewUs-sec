"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
    mode: "onChange",
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
    submitButton,
    setReviewButton,
    setDetailsButton,
    detailsButton,
    setCustomerDetails,
    customerDetails,
  } = useReviewPageStore();

  useEffect(() => {
    if (customerDetails.image) {
      const imageUrl = URL.createObjectURL(customerDetails.image);
      setSelectedImage(imageUrl);
    }
    form.reset({
      FirstName: customerDetails.firstName || "",
      LastName: customerDetails.lastName || "",
      image: customerDetails.image || undefined,
      email: customerDetails.email || "",
      company: customerDetails.company || "",
      jobTitle: customerDetails.jobTitle || "",
    });

    return () => {
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage);
      }
    };
  }, [customerDetails, form]);

  const isFormValid = form.formState.isValid;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const normalizedData = {
      firstName: data.FirstName,
      lastName: data.LastName,
      email: data.email,
      company: data.company,
      jobTitle: data.jobTitle,
      image: data.image,
    };

    console.log({ data });
    console.log({ submitButton });
    setCustomerDetails(normalizedData);
    setReviewButton("Text");
    setDetailsButton(!detailsButton);
    console.log(useReviewPageStore.getState().customerDetails);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      form.setValue("image", file, { shouldValidate: true });
    }
  };
  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <Card className="relative w-[550px] px-[2%] h-[80%] border-none shadow-none font-satoshi">
      <CardHeader>
        <CardTitle className="text-left text-[#33313B] text-[36px] font-[500]">
          Tell us about yourself
        </CardTitle>
        <CardDescription className="text-[#222222] font-[400] text-[16px] leading-[24px]">
          This information may be displayed with your testimonial.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-[14px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-[40px] mt-3"
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
                          onClick={handleUploadClick}
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
                  <FormLabel>
                    First Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Udit" {...field} className="h-[48px]" />
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
                  <FormLabel>
                    Last Name<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Kapoor"
                      {...field}
                      className="h-[48px]"
                    />
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
                  <FormLabel>
                    Enter your email<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="udit123@gmail.com"
                      {...field}
                      className="h-[48px]"
                    />
                  </FormControl>
                  <div className="text-xs pt-0 font-light">
                    Your email will not be shared publically
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Company<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Apple"
                      {...field}
                      className="h-[48px]"
                    />
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
                  <FormLabel>
                    Job Title<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Software Developer"
                      {...field}
                      className="h-[48px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                variant="form"
                disabled={!isFormValid}
                className={`w-3/12 py-5 ${
                  !isFormValid ? "cursor-not-allowed" : "cursor-pointer"
                }`}
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
