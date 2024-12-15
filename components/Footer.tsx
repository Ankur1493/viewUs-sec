import React from "react";
import Image from "next/image";
import logo from "@/public/assets/images/logo.png";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141111] text-white py-8 w-full md:px-20 border-t border-t-[#0F0D0D]">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        <div className="w-full lg:w-1/4 mb-12 md:mb-6 lg:mb-0">
          <div className="flex items-center">
            <div className="relative w-8 h-8 mr-2">
              <Image src={logo} alt="Logo" layout="fill" objectFit="cover" />
            </div>
            <span className="text-xl font-semibold">ViewUs</span>
          </div>
        </div>

        <div className="flex gap-0 w-full lg:w-1/2">
          <div className="w-full lg:w-2/4 mb-6 lg:mb-0">
            <h3 className="text-sm md:text-lg font-bold mb-4">
              Why Viewus
            </h3>
            <ul className="grid text-gray-300 gap-2">
              <li>
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-2/4 mb-6 lg:mb-0">
            <h3 className="text-sm md:text-lg font-bold mb-4">
              Socials
            </h3>
            <ul className="grid text-gray-300 gap-2">
              <li>
                <Link href="https://cal.com/ankur-sharma/15min">Call Us</Link>
              </li>
              <li>
                <Link href="https://x.com/ankursharma1493">Twitter</Link>
              </li>
              <li>
                <Link href="https://github.com/Ankur1493/viewUs-sec">Github</Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-3/4 mb-6 lg:mb-0">
            <h3 className="text-sm md:text-lg font-bold mb-4">Articles</h3>
            <ul className="grid text-gray-300  gap-2">
              <li>
                <Link href="/articles/manage-testimonials">How to manage testimonials</Link>
              </li>
              <li>
                <Link href="/articles/collect-testimonials">Collect testimonials easily</Link>
              </li>
              <li>
                <Link href="/articles/share-testimonials">Share testimonials in seconds</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
