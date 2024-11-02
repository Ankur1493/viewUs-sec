"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Trash2, EyeOff, Eye } from "lucide-react";
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
import { deleteUserProfile, updateUserPassword } from "@/actions/user";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

interface PasswordFormState {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  showOldPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
}

export const Profile = ({ user }: { user: User }) => {
  const cdn = process.env.NEXT_PUBLIC_CDN_NAME;
  const router = useRouter()

  const [imageKey, setImageKey] = useState(Date.now())
  const [passwordValues, setPasswordValues] = useState<PasswordFormState>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    showOldPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(
    user.image ? `${cdn}/${user.image}?v=${imageKey}` : null
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

  const handleClickShowPassword = (field: keyof PasswordFormState) => {
    setPasswordValues((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handlePasswordChange = (prop: keyof PasswordFormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValues({
      ...passwordValues,
      [prop]: event.target.value,
    });
  };

  const handleChangePassword = async () => {

    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      // toast passwords are not matching
      console.log("new and confirm password are wrong")
      return
    }

    const response = await updateUserPassword({ id: user.id, old: passwordValues.oldPassword, newPass: passwordValues.newPassword })

    if (response.status) {
      console.log(response.message)

    } else {
      console.log("sorry can not change")
    }

    console.log(response.message)
    passwordValues.oldPassword = "";
    passwordValues.newPassword = "";
    passwordValues.confirmPassword = "";
    console.log("Change password clicked");

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
      const response = await axios.post("/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.status);
      //toast profile updated
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };


  const handleDeleteAccount = async () => {
    const response = await deleteUserProfile(user.id);
    if (response.status) {
      await signOut()
      router.push("/login")
    } else {
      //toast response.message
      console.log(response.message)
    }
  };

  return (
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
          <AlertDialog>
            <AlertDialogTrigger className="w-1/2">
              <div
                className="h-9 px-4 py-2 flex items-center justify-center w-full shadow-md border rounded-md text-sm font-medium"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Change Password
              </div>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white shadow-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will not be able to change your password for next 2 hours,
                  we will also share a mail to confirm, if you have changed the password, ignore that mail
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="relative">
                <Input
                  placeholder="old password"
                  onChange={handlePasswordChange('oldPassword')}
                  type={passwordValues.showOldPassword ? "text" : "password"}
                  value={passwordValues.oldPassword}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => handleClickShowPassword('showOldPassword')}
                  onMouseDown={handleMouseDownPassword}
                  aria-label={passwordValues.showOldPassword ? "Hide password" : "Show password"}
                >
                  {passwordValues.showOldPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <div className="relative">
                <Input
                  placeholder="new password"
                  onChange={handlePasswordChange('newPassword')}
                  type={passwordValues.showNewPassword ? "text" : "password"}
                  value={passwordValues.newPassword}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => handleClickShowPassword('showNewPassword')}
                  onMouseDown={handleMouseDownPassword}
                  aria-label={passwordValues.showNewPassword ? "Hide password" : "Show password"}
                >
                  {passwordValues.showNewPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <div className="relative">
                <Input
                  placeholder="confirm password"
                  onChange={handlePasswordChange('confirmPassword')}
                  type={passwordValues.showConfirmPassword ? "text" : "password"}
                  value={passwordValues.confirmPassword}
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => handleClickShowPassword('showConfirmPassword')}
                  onMouseDown={handleMouseDownPassword}
                  aria-label={passwordValues.showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {passwordValues.showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-600 hover:bg-opacity-90">
                  <div onClick={handleChangePassword}>
                    Change
                  </div>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          {/*Delete dialog belo*/}
          <AlertDialog>
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
                  <div onClick={handleDeleteAccount}>
                    Delete
                  </div>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

