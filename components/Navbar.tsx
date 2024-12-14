"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import logo from "@/public/assets/images/logo1.png";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar = ({ active }: { active: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { href: "/pricing", label: "Pricing" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About" },
  ];

  return (
    <header
      className={`bg-white bg-opacity-30 backdrop-blur-md text-black shadow-custom p-4 sticky top-0 transition-all duration-500 ease-in-out z-[50] flex justify-between items-center ${isScrolled
          ? "w-full md:w-[80%] transform md:top-10 md:rounded-xl"
          : "w-full lg:pr-6"
        } `}
    >
      <Link href="/">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={40} height={40} />
          <span className="font-semibold">ViewUs</span>
        </div>
      </Link>
      <div className="md:flex items-center justify-center gap-12 hidden">
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link
                className={cn(
                  active === "pricing"
                    ? "pb-6 border-b-4 border-b-red-400"
                    : "",
                  "pb-6 duration-100 hover:border-b-4 hover:border-b-red-400"
                )}
                href="/pricing"
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  active === "articles"
                    ? "pb-6 border-b-4 border-b-red-400"
                    : "",
                  "pb-6 duration-100 hover:border-b-4 hover:border-b-red-400"
                )}
                href="/articles"
              >
                Articles
              </Link>
            </li>
            <li>
              <Link
                className={cn(
                  active === "about" ? "pb-6 border-b-4 border-b-red-400" : "",
                  "pb-6 duration-100 hover:border-b-4 hover:border-b-red-400"
                )}
                href="/about"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link href="/login">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
      <div className="md:hidden relative">
        <Button
          variant="ghost"
          size="icon"
          className="relative z-50 transition-all duration-300 ease-in-out"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    active === item.href.slice(1) && "bg-gray-100 text-gray-900"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setIsMenuOpen(false)}
              >
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
