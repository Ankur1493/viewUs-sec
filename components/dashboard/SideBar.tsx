"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { House, Briefcase, CircleHelp } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

export function SideBar() {
  const links = [
    {
      label: "Home",
      href: "#",
      icon: (
        <House className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
    {
      label: "Projects",
      href: "#",
      icon: (
        <Briefcase className="text-neutral-700 h-6 w-6 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-r-md flex flex-col md:flex-row bg-white w-full flex-1 max-w-7xl mx-auto overflow-hidden border-r border-neutral-200",
        "h-screen",
      )}
    >
      <Sidebar open={open} setOpen={setOpen} animate={false}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <>
              <Logo />
            </>
            <div className="flex justify-center mt-8"><Button className="w-[80%] bg-[#71D4FF] rounded-3xl py-6 text-black hover:bg-[#71D4FF] hover:bg-opacity-80">Create New Project</Button></div>
            <div className="mt-8 flex px-8 flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link}/>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <SidebarLink
              link={{
                label: "Help & Support",
                href: "#",
                icon: (
                  <CircleHelp className="text-neutral-700 h-6 w-6 flex-shrink-0" />
                ),
              }}
            />
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
        className="font-medium text-xl text-black whitespace-pre"
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
