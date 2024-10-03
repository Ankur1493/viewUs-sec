import React from "react";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-none text-black py-8 w-full mt-24 px-20 border-t border-t-gray-200">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
          <div className="flex items-center">
            <div className="relative w-8 h-8 overflow-hidden  mr-2">
              <Image
                src="/assets/images/sample.png"
                alt="Logo"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <span className="text-xl font-semibold">ViewUs</span>
          </div>
        </div>

        <div className="flex gap-10 w-1/2">
          <div className="w-full lg:w-3/4 mb-6 lg:mb-0">
            <h3 className="text-lg font-bold mb-4">PRODUCTS</h3>
            <ul className="grid grid-rows-3 grid-cols-2 gap-2">
              <li>
                <a href="#">Our Wall of Love</a>
              </li>
              <li>
                <a href="#">Pricing</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a href="#">Integrations</a>
              </li>
              <li>
                <a href="#">Help center</a>
              </li>
              <li>
                <a href="#">Product demo</a>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-3/4 mb-6 lg:mb-0">
            <h3 className="text-lg font-bold mb-4">COMPANY AND SUPPORT</h3>
            <ul className="grid grid-cols-2 gap-2">
              <li>
                <a href="#">Our resources</a>
              </li>
              <li>
                <a href="#">Tutorials</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie policy</a>
              </li>
              <li>
                <a href="#">Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
