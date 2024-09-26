"use client";
import React, { useEffect, useState } from "react";

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
    <div>
      <header
        className={`bg-white bg-opacity-10 backdrop-blur-xl text-white shadow-2xl p-4 fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out z-50 shadow-md 
        flex justify-between items-center ${
          isScrolled
            ? "w-[80%] left-1/2 transform -translate-x-1/2 mt-10 rounded-xl"
            : "w-full"
        } mx-auto`}
      >
        <div className="flex items-center">
          <div className="h-5 w-5 bg-black rounded-full mr-2"></div>
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
            <button className="bg-gray-200 bg-opacity-40 text-black py-2 px-4 rounded-md hover:bg-gray-300">
              Sign Up
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
