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
  Heart,
  Link2,
  MessageCircleHeartIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { useParams, usePathname } from "next/navigation";
import { useTestimonialFilterStore } from "@/store/useTestimonialFilterStore";
import { HelpSupportModal } from "../dashboard/HelpSupportModal";
import Image from "next/image";

export function SpaceSideBar({ email }: { email: string }) {
  const { slug } = useParams();
  const pathName = usePathname();

  const { filter, setFilter } = useTestimonialFilterStore();
  const isImportedActive = pathName.includes("import");
  const isPublicActive = pathName.includes("public");
  const isWallActive = pathName.includes("wall");

  const inboxLinks = [
    {
      label: "All",
      icon: (
        <CircleCheckIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />
      ),
      onClick: () => setFilter("all"),
      key: "all",
    },
    {
      label: "Written",
      icon: <PencilIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("text"),
      key: "text",
    },
    {
      label: "Video",
      icon: <VideoIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("video"),
      key: "video",
    },
    {
      label: "Imported",
      icon: <ImportIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("imported"),
      key: "imported",
    },
    {
      label: "Liked",
      icon: <Heart className="text-neutral-700 h-4 w-4 flex-shrink-0" />,
      onClick: () => setFilter("liked"),
      key: "liked",
    },
  ];

  const PageLinks = [
    {
      label: "Your Public URL",
      href: `/space/${slug}/public`,
      key: "public",
      icon: <Link2 className="text-neutral-700 h-6 w-6 flex-shrink-0" />,
    },
    {
      label: "Wall of Love",
      key: "wall",
      href: `/space/${slug}/wall`,
      icon: (
        <MessageCircleHeartIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
  ];

  return (
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
                    <SidebarMenuButton
                      key={idx}
                      onClick={link.onClick}
                      className={cn(
                        "p-2 rounded-md",
                        filter === link.key &&
                          !isImportedActive &&
                          !isPublicActive &&
                          !isWallActive
                          ? "bg-gray-100"
                          : "bg-transparent"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        {link.icon}
                        <span className="text-neutral-900">{link.label}</span>
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
              <SidebarMenuItem>
                <Link
                  href={`/space/${slug}/import`}
                  className="flex items-center cursor-pointer"
                >
                  <SidebarMenuButton
                    className={cn(isImportedActive ? "bg-gray-100" : "")}
                  >
                    <ImportIcon className="text-neutral-700 h-4 w-4 flex-shrink-0" />
                    <span className="ml-2">Import Testimonials</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Pages</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col jutify-center items-center">
            <SidebarMenu className="w-[80%]">
              {PageLinks.map((link, idx) => {
                const isActive =
                  (link.key === "public" && isPublicActive) ||
                  (link.key === "wall" && isWallActive);
                return (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton
                      asChild
                      className={cn(isActive ? "bg-gray-100" : "")}
                    >
                      <Link href={link.href}>
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex gap-3 jutify-center items-center">
        <SidebarMenuButton className="w-[80%]">
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

export const Logo = () => {
  return (
    <Link
      href="/dashboard"
      className="font-normal flex justify-center space-x-2 items-center text-sm text-black py-4 relative z-20"
    >

      <Image src="/assets/images/logo1.png" height={40} width={40} alt="logo" />
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

