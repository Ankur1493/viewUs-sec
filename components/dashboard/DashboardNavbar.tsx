import { Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import Image from "next/image";

export const DashboardNavbar = async ({ user }: { user: User }) => {
  const session = await auth();

  return (
    <div className="sticky bg-white border-b z-10 top-0 h-[61px] w-full px-2 md:px-8 flex items-center justify-end gap-4 overflow-x-hidden">
      {/* <div className="sticky bg-white/30 backdrop-blur-md z-10 top-0 h-[60px] w-full px-2 md:px-8 flex items-center justify-end gap-4 overflow-x-hidden"> */}
      <Link href="/pricing">
        <Button className="px-2 text-sm bg-purple-600 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] hover:bg-purple-600 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] hover:bg-opacity-80">
          ✨ Upgrade
        </Button>
      </Link>
      <Link href="/settings" className="cursor-pointer">
        <Settings className="cursor-pointer" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center relative">
          <div className="w-10 h-10 rounded-full border-white bg-sky-100">
            <Image
              src={
                user.image
                  ? `https://d3eyp937ijscg0.cloudfront.net/${user.image}`
                  : "https://d3eyp937ijscg0.cloudfront.net/viewus_images/profile.png"
              }
              alt="logo"
              width={60}
              height={60}
              className="w-full h-full rounded-full object-contain"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute mt-2 right-0">
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          {session && (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button type="submit" className="w-full">
                <DropdownMenuItem className="cursor-pointer w-full">
                  Sign Out
                </DropdownMenuItem>
              </button>
            </form>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
