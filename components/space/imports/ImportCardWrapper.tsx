"use client";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalTrigger,
  ModalBody,
  ModalContent,
} from "@/components/ui/animated-modal";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SocialPlatformsType } from "./ImportPosts";
import axios from "axios";

interface CardWrapperProps {
  title: string;
  slug: SocialPlatformsType;
  placeholder: string;
  image: string;
}

export const ImportCardWrapper: React.FC<CardWrapperProps> = ({
  title,
  slug,
  placeholder,
  image,
}) => {

  const FormSchema = z.object({
    link: z.string().url({ message: "Please enter a valid URL." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      link: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {

    const statusId = data.link.split("/status/")[1];
    try {
      if (!statusId) {
        console.error("Invalid URL format.");
        return;
      }
      const response = await axios.post(`/api/import-testimonial/${slug.toString().toLowerCase()}/${statusId}`)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-transparent text-white flex justify-center group/modal-btn">
          <Card className="w-full bg-gray-50 w-40 h-40 flex justify-center items-center text-black shadow-md">
            <CardHeader className="flex  items-center py-4">
              <div className=" relative w-[60px] h-[60px]">
                <Image
                  src={image}
                  alt={title}
                  layout="fill"
                  className="absolute object-cover"
                />
              </div>
              <CardTitle className="text-sm">{title}</CardTitle>
            </CardHeader>
          </Card>
        </ModalTrigger>
        <ModalBody className="p-0 bg-white shadow-md">
          <ModalContent className="flex p-0 bg-white shadow-md justify-center items-center">
            <Card className="w-full bg-transparent flex flex-col justify-center items-center text-black shadow-none border-none">
              <CardHeader className="flex flex-col items-center py-4">
                <Image
                  src={image}
                  alt={title}
                  width={60}
                  height={60}
                  className="rounded-full object-contain"
                />
                <CardTitle className="text-2xl">{title}</CardTitle>
              </CardHeader>
              <CardContent className="w-full">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={form.control}
                      name="link"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder={placeholder}
                              className=""
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      className="w-full"
                    >
                      Submit
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};
