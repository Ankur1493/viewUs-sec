"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
      className={`bg-white bg-opacity-10 backdrop-blur-xl text-black shadow-xl p-4 sticky top-0 transition-all duration-300 ease-in-out z-[50] flex justify-between items-center ${
        isScrolled ? "w-[80%] transform top-10 rounded-xl" : "w-full"
      } `}
    >
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 bg-black rounded-full"></div>
        <span className="font-semibold">ReviewIt</span>
      </div>
      <div className="flex items-center justify-center gap-4">
        <nav>
          <ul className="flex gap-4">
            <li>
              <a href="#">Wall Of Love</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </nav>
        <div>
          <Link href={"/login"}>
            <button className="text-black py-2 px-4 rounded-md bg-black text-white hover:bg-opacity-80">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
