"use client";
import React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
} from "../ui/sidebar";
import {
  House,
  LogOutIcon,
  BookTextIcon,
  CircleDollarSignIcon,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { HelpSupportModal } from "./HelpSupportModal";
import Image from "next/image";

export function SideBar({ email }: { email: string }) {
  const links = [
    {
      label: "Home",
      href: "/dashboard",
      icon: <House className="text-neutral-700 h-6 w-6" />,
    },
    {
      label: "Articles",
      href: "/blogs",
      icon: <BookTextIcon className="text-neutral-700 h-6 w-6" />,
    },
    {
      label: "Pricing",
      href: "/pricing",
      icon: <CircleDollarSignIcon className="text-neutral-700 h-6 w-6" />,
    },
    {
      label: "Review Us",
      href: "/a/viewus",
      icon: <ExternalLink className="text-neutral-700 h-6 w-6" />,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col jutify-center items-center bg-white border-b">
        <Logo />
      </SidebarHeader>
      <SidebarContent className=" bg-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700">
            Dashboard
          </SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col jutify-center items-center">
            <SidebarMenu className="w-[95%]">
              {links.map((link, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={link.href}
                      target={link.label === "Home" ? "" : "_blank"}
                    >
                      {link.icon}
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex gap-3 jutify-center items-center bg-white">
        <SidebarMenuButton className="w-[95%]">
          <HelpSupportModal email={email} />
        </SidebarMenuButton>
        <Button
          onClick={(event) => {
            event.preventDefault();
            signOut();
          }}
          className="flex gap-2 items-center py-2 rounded-xl w-[80%]"
        >
          <LogOutIcon size={15} /> Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

export const Logo = () => (
  <Link
    href="/dashboard"
    className="font-normal flex justify-center space-x-2 items-center text-sm text-black py-2 relative z-20"
  >
    <Image src="/assets/images/logo1.png" height={30} width={30} alt="logo" />
    <span className="font-bold text-xl text-black whitespace-pre">ViewUs</span>
  </Link>
);
