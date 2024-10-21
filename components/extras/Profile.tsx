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
import { updateUserProfile } from "@/actions/user";

<<<<<<< HEAD
const ProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  email: z.string().email(),
  image: z
    .any()
    .refine((file) => file instanceof File, "Please upload an image file.")
    .refine(
      (file) => ["image/jpeg", "image/jpg", "image/png"].includes(file?.type),
      "Only .jpg or .png files are accepted."
    )
    .optional(),
});

interface User {
  id?: string;
  name?: string | null;
  email?: string;
  company?: string | null;
  imageUrl?: string;
  jobTitle?: string | null;
}

interface ProfileProps {
  user: User | null;
}

export const Profile = ({ user }: ProfileProps) => {
=======

export const Profile = ({ user }: { user: User }) => {
>>>>>>> a888493 (user update action, needs aws image improvement)
  const [selectedImage, setSelectedImage] = useState<string | null>(
    user.image || null
  );

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
<<<<<<< HEAD
      name: user?.name || "",
      email: user?.email || "",
      company: user?.company || "",
      jobTitle: user?.jobTitle || "",
=======
      name: user.name || "",
      email: user.email,
      company: user.company || "",
      jobTitle: user.JobTitle || "",
>>>>>>> a888493 (user update action, needs aws image improvement)
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
    data.email = user.email
    const response = await updateUserProfile(data)
    console.log(response)

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
                  {selectedImage ? (
                    <Image
                      src={selectedImage}
                      alt="Selected Image"
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <Image
                      src={profileImage}
                      alt="Profile"
                      width={28}
                      height={28}
                    />
                  )}
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        placeholder="Enter your email"
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.name?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

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

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job jobTitle</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter your job jobTitle" />
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
          <div className="flex space-x-4 w-full py-4">
            <Button
              variant="outline"
              className="w-1/2 shadow-md"
              onClick={handleChangePassword}
            >
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>

            <AlertDialogTrigger
              className="w-1/2">
              <div
                className="h-9 px-4 py-2 flex items-center justify-center  w-full shadow-md bg-red-600 hover:bg-red-600 hover:bg-opacity-90 bg-destructive text-destructive-foreground whitespace-nowrap rounded-md text-sm font-medium"
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
