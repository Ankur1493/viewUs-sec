"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupLabel,
} from "../ui/sidebar";
import {
  LogOutIcon,
  ImportIcon,
  CircleCheckIcon,
  PencilIcon,
  VideoIcon,
  Settings,
  Heart,
  Link2,
  MessageCircleHeartIcon,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useTestimonialFilterStore } from "@/store/useTestimonialFilterStore";

export function SpaceSideBar() {

  const { slug } = useParams();

  const { setFilter } = useTestimonialFilterStore()

  const inboxLinks = [
    {
      label: "All",
      icon: (
        <CircleCheckIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />
      ),
      onClick: () => setFilter("all"),
    },
    {
      label: "Written",
      icon: <PencilIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("text"),
    },
    {
      label: "Video",
      icon: <VideoIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("video"),
    },
    {
      label: "Imported",
      icon: <ImportIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("imported"),
    },
    {
      label: "Liked",
      icon: <Heart className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("liked"),
    },
  ];

  const PageLinks = [
    {
      label: "Your Public URL",
      href: "/dashboard",
      icon: <Link2 className="text-neutral-700 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Wall of Love",
      href: "/",
      icon: (
        <MessageCircleHeartIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div
      className={cn(
        "md:rounded-r-xl flex flex-col md:flex-row w-full flex-1 max-w-7xl ml-0 pl-0 mx-auto overflow-hidden md:border-r border-neutral-200",
        "h-screen"
      )}
    >
      <Sidebar>
        <SidebarHeader className="flex flex-col jutify-center items-center">
          <Logo />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Inbox</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col jutify-center items-center">
              <SidebarMenu className="w-[80%]">
                {inboxLinks.map((link, idx) => (
                  <SidebarMenuItem key={idx}>
                    <Link href={`/space/${slug}`}>
                      <SidebarMenuButton onClick={link.onClick}>
                        <div className="flex items-center cursor-pointer">
                          {link.icon}
                          <span className="ml-2">{link.label}</span>
                        </div>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Integrations</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col jutify-center items-center">
              <SidebarMenu className="w-[80%]">
                <SidebarMenuItem >
                  <SidebarMenuButton>
                    <Link href={`/space/${slug}/import`} className="flex items-center cursor-pointer">
                      <ImportIcon />
                      <span className="ml-2">Import Testimonials</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupContent className="flex flex-col jutify-center items-center">
              <SidebarMenu className="w-[80%]">
                {PageLinks.map((link, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <Link href={link.href}>
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
        <SidebarFooter className="flex gap-3 jutify-center items-center">
          <SidebarMenuButton className="w-[80%]">
            <Link href="#" className="flex items-center justify-center gap-1">
              <Settings size={18} />
              <span>Help and Support</span>
            </Link>
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
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex justify-center space-x-2 items-center text-sm text-black py-4 relative z-20"
    >
      <div className="h-8 w-8 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-2xl text-black whitespace-pre"
      >
        ViewUs
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-black rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
