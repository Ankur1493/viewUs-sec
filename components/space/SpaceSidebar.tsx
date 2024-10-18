"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { CircleHelp, LogOutIcon, ImportIcon, CircleCheckIcon, PencilIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export function SpaceSideBar() {

  const links = [
    {
      label: "All",
      href: "/dashboard",
      icon: (
        <CircleCheckIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Written",
      href: "/docs",
      icon: (
        <PencilIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Video",
      href: "/pricing",
      icon: (
        <VideoIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Imported",
      href: "/articles",
      icon: (
        <ImportIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Liked",
      href: "/articles",
      icon: (
        <ImportIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "md:rounded-r-xl flex flex-col md:flex-row w-full flex-1 max-w-7xl ml-0 pl-0 mx-auto overflow-hidden md:border-r border-neutral-200",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="flex justify-start pl-4 mt-8 border-t border-t-gray-200 text-xl text-neutral-600 font-semibold">Inbox</div>
            <div className="mt-1 flex px-8 flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink className="py-1" key={idx} link={link} />
              ))}
            </div>
            <div className="flex justify-start pl-4 mt-6 border-t border-t-gray-200 text-xl text-neutral-600 font-semibold">Import Testimonials</div>
            <div className="mt-1 flex px-8 flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink className="py-1" key={idx} link={link} />
              ))}
            </div>
            <div className="flex justify-start pl-4 mt-6 border-t border-t-gray-200 text-xl text-neutral-600 font-semibold">Inbox</div>
            <div className="mt-1 flex px-8 flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink className="py-1" key={idx} link={link} />
              ))}
            </div>
          </div>
          <div className="mt-8 flex px-8 flex-col gap-2">
            <SidebarLink
              link={{
                label: "Help & Support",
                href: "mailto:team@viewus.in",
                icon: (
                  <CircleHelp className="text-neutral-700 h-6 w-6 flex-shrink-0" />
                ),
              }}
            />
            <button
              onClick={() => {
                signOut()
              }}
              className="flex items-center justify-start gap-2 group/sidebar py-2 rounded-xl hover:shadow-md hover:shadow-gray-300">
              <LogOutIcon className="text-neutral-700 h-6 w-6 flex-shrink-0" />
              Sign Out
            </button>
          </div>
        </SidebarBody>
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
