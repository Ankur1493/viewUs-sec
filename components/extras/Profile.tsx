"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Key, Trash2 } from "lucide-react";
import profileImage from "@/public/assets/images/profile.png";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { User } from "@prisma/client";
import { profileSchema } from "@/schemas/user";
import axios from "axios";


export const Profile = ({ user }: { user: User }) => {
  const cdn = process.env.NEXT_PUBLIC_CDN_NAME; // Use the updated environment variabl
  const [selectedImage, setSelectedImage] = useState<string | null>(
    user.image ? `${cdn}/${user.image}` : null // Ensure the URL is properly constructed
  );

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email,
      company: user.company || "",
      jobTitle: user.JobTitle || "",
    },
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      form.setValue("image", file, { shouldValidate: true });
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = async (data: z.infer<typeof profileSchema>) => {
    // Ensure the email is not modifiable
    data.email = user.email!;

    // Convert the form data to FormData to handle image uploads
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("company", data.company || "");
    formData.append("jobTitle", data.jobTitle || "");
    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    try {
      // Send the form data to the API
      const response = await axios.post("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      });
      console.log("updated");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
  };

  return (
    <AlertDialog>
      <div className="container mx-auto px-4 overflow-hidden pb-2">
        <div className="mb-8 px-6">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 mb-2">
            Profile
          </h2>
        </div>
        <div className="w-1/2 px-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSaveChanges)}
              className="space-y-4"
            >
              <div className="flex gap-4 items-center">
                <div className="relative w-[64px] h-[64px] rounded-full overflow-hidden bg-[#E9F8FF] flex items-center justify-center">
                  <Image
                    src={
                      selectedImage ? selectedImage : profileImage
                    }
                    alt="Selected Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Button
                  onClick={handleChangeImage}
                  variant="outline"
                  className="shadow-md"
                >
                  Change Image
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                  aria-label="Change profile image"
                />
              </div>

              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your name" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.email?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Company field */}
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your company" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.company?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              {/* Job title field */}
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your job title" />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.jobTitle?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <Button className="w-full shadow-md mt-24" type="submit">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </form>
          </Form>

          {/* Password and delete account section */}
          <div className="flex space-x-4 w-full py-4">
            <Button
              variant="outline"
              className="w-1/2 shadow-md"
              onClick={handleChangePassword}
            >
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>

            <AlertDialogTrigger className="w-1/2">
              <div
                className="h-9 px-4 py-2 flex items-center justify-center w-full shadow-md bg-red-600 hover:bg-red-600 hover:bg-opacity-90 text-white rounded-md text-sm font-medium"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete My Account
              </div>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white shadow-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-600 hover:bg-opacity-90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </div>
        </div>
      </div>
    </AlertDialog>
  );
};

