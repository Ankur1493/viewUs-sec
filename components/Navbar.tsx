"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`bg-white bg-opacity-30 backdrop-blur-md text-black shadow-custom p-4 sticky top-0 transition-all duration-500 ease-in-out z-[50] flex justify-between items-center ${isScrolled ? "w-[80%] transform top-10 rounded-xl" : "w-full"} `}
    >
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-black rounded"></div>
        <span className="font-semibold">ViewUs</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link href="/pricing">Pricing</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div>
          <Link href="/login">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
