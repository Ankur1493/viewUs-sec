"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";

interface User {
  name?: string;
  email?: string;
  company?: string;
  imageUrl?: string;
  title?: string;
}

export const Profile = () => {
  const session = useSession();
  const userData = session.data?.user;
  const [user, setUser] = useState<User>({
    name: userData?.name || "",
    email: userData?.email || "",
    company: userData?.name || "",
    imageUrl: userData?.image || "",
    title: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userData) {
      setUser({
        name: userData.name || "",
        email: userData.email || "",
        company: userData.name || "",
        imageUrl: userData.image || "",
        title: "",
      });
    }
  }, [userData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) => ({
          ...prevUser,
          imageUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeImage = () => {
    fileInputRef.current?.click();
  };

  const handleSaveChanges = () => {
    console.log("Saving changes:", user);
  };

  const handleChangePassword = () => {
    console.log("Change password clicked");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account clicked");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.imageUrl} alt={userData?.name || "User"} />
              <AvatarFallback>
                {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            <Button onClick={handleChangeImage} variant="outline">
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
            <h2 className="text-2xl font-bold">{user.name || "No Name"}</h2>
            <p className="text-muted-foreground">{user.email || "No Email"}</p>
            <p className="text-muted-foreground">
              {user.title || ""} {user.company || "No Company"}
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={user.name || ""}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email || ""}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                name="company"
                value={user.company || ""}
                onChange={handleInputChange}
                placeholder="Enter your company"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={user.title || ""}
                onChange={handleInputChange}
                placeholder="Enter your job title"
              />
            </div>
            <div className="flex space-x-4 w-full pt-4">
              <Button
                variant="outline"
                className="w-1/2 shadow-md border-2"
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
              <Button
                className="w-1/2 shadow-md"
                variant="destructive"
                onClick={handleDeleteAccount}
              >
                Delete My Account
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full bg-green-600 hover:bg-green-600 hover:bg-opacity-80 shadow-md"
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};
