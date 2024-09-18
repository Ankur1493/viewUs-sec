"use client"; // Add this at the top

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  image: z
    .any()
    .refine((file) => file instanceof File, "Please upload an image file.")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file?.type),
      "Only .jpg or .png files are accepted."
    ),
  email: z.string().email(),
  description: z.string().min(4, {
    message: "Description must be at least 4 characters.",
  }),
});

export const PersonalDetialCard = ({ image }: { image: string | null }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      image: undefined,
      email: "",
      description: "",
    },
  });

  const { textReview, starred } = useReviewPageStore();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    console.log({ textReview });
    console.log({ starred });
  }

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
    <Card className="w-[450px] px-[2%]">
      <CardHeader>
        <div className="flex justify-center">
          <Image
            src={image!}
            alt="logo"
            height={80}
            width={80}
            className="rounded-full"
          />
        </div>

        <CardTitle className="text-center text-[#33313B]">
          Just a Last Step🙌
        </CardTitle>
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
                  <FormLabel>Attach Image</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <div className="relative w-20 h-20 rounded-full overflow-hidden">
                        {selectedImage ? (
                          <Image
                            src={selectedImage}
                            alt="Selected Image"
                            layout="fill"
                            objectFit="cover"
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gray-300 rounded-full" />
                        )}
                      </div>

                      <div className="flex flex-col">
                        <Button
                          className="px-4 py-2 bg-gray-800 text-white"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          {selectedImage ? "Upload Again" : "Add Image"}
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter your name</FormLabel>
                  <FormControl>
                    <Input placeholder="john" {...field} />
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
                  <FormLabel>Enter your email</FormLabel>
                  <FormControl>
                    <Input placeholder="john123@gmail.com" {...field} />
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
                  <FormLabel>Enter your Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
