import { User } from "@prisma/client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { Mail, Briefcase, Building2, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export const Profile = ({ user }: { user: User }) => {
  return (
    <div className="w-full">
      <div className="container max-w-3xl space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full border-white bg-sky-100">
              <Image
                src={
                  user.image
                    ? `https://d3eyp937ijscg0.cloudfront.net/${user.image}`
                    : "https://d3eyp937ijscg0.cloudfront.net/viewus_images/profile.png"
                }
                alt="logo"
                width={100}
                height={100}
                className="w-full h-full rounded-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-black">
                {user.name}
              </h1>
              {(user.JobTitle || user.company) && (
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                  {user.JobTitle && (
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{user.JobTitle}</span>
                    </div>
                  )}
                  {user.company && (
                    <div className="flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      <span>{user.company}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Link href="/settings">
            <Button variant="outline" size="sm" className="text-black">
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </Link>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="gap-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-primary">{user.email}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Account Created
                  </div>
                  <div className="font-medium">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Last Updated
                  </div>
                  <div className="font-medium">
                    {user.updatedAt
                      ? new Date(user.updatedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : ""}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
