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

export const DashboardNavbar = async () => {
  const session = await auth();

  return (
    <div className="sticky top-0 h-[60px] w-full px-8 flex items-center justify-end gap-4 overflow-x-hidden">
      <Link href="/pricing">
        <Button className="ml-2 px-2 text-sm bg-purple-600 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] hover:bg-purple-600 [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] hover:bg-opacity-80">
          ✨ Upgrade
        </Button>
      </Link>
      <Link href="/settings" className="cursor-pointer">
        <Settings className="cursor-pointer" />
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center relative">
          <div className="w-9 h-9 rounded-full bg-black"></div>
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
