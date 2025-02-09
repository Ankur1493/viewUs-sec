"use client";
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CardWrapperProps {
  title: string;
  description: string;
  slug: SocialPlatformsType;
  placeholder: string;
  image: string;
}

export const ImportCardWrapper: React.FC<CardWrapperProps> = ({
  title,
  description,
  slug,
  placeholder,
  image,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const FormSchema = z.object({
    link: z.string().url({ message: "Please enter a valid URL." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      link: "",
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `/api/import-testimonial/${slug.toString().toLowerCase()}`,
        { url: data.link }
      );
      toast.success("Testimonial imported successfully");
      console.log(response.data);
      const currentUrl = window.location.href;
      const newUrl = currentUrl.substring(0, currentUrl.lastIndexOf("/"));
      router.push(newUrl);
    } catch (err) {
      console.log(err);
      toast.error("Failed to import testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        layoutId={`card-${title}`}
        className="flex items-center justify-center"
        onClick={() => setIsModalOpen(true)}
      >
        <Card className="w-full relative flex flex-col gap-3 justify-start items-start p-4 text-black rounded-md shadow-none shadow-sm cursor-pointer">
          <motion.div
            layoutId={`image-${title}`}
            className="relative h-12 w-12 py- p-0 flex items-start justify-start"
          >
            <Image src={image} alt={title} fill className={`object-cover`} />
          </motion.div>
          <div>
            <motion.h3
              layoutId={`title-${title}`}
              className="mb-1 font-semibold text-left"
            >
              {title}
            </motion.h3>
            <p className="text-sm text-muted-foreground text-left">
              {description}
            </p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </Card>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setIsModalOpen(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <motion.div
                ref={modalRef}
                layoutId={`card-${title}`}
                onClick={handleModalClick}
                className="bg-white relative rounded-lg shadow-xl w-full max-w-md mx-4 p-6"
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">×</span>
                </button>

                <div className="flex flex-row gap-2 items-center mb-6">
                  <motion.div
                    layoutId={`image-${title}`}
                    className="relative w-10 h-10 rounded-md"
                  >
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.h2
                    layoutId={`title-${title}`}
                    className="text-2xl font-semibold text-black"
                  >
                    Import from {title}
                  </motion.h2>
                </div>
                <div>
                  <p className="text-md font-medium">Product Url:</p>
                </div>

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
                      className={`mt-4 w-full ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      } ${title === "LinkedIn" ? "bg-blue-600" : title === "Product Hunt" ? "bg-orange-600" : ""}`}
                      disabled={loading}
                    >
                      {loading ? "Importing..." : "Import"}{" "}
                    </Button>
                  </form>
                </Form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
