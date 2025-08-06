import React from "react";
import { Logo } from "./svgs/logo";
import Linkedin from "./svgs/linkedin";
import XTwitter from "./svgs/twitter";
import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full ">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        <div className="w-full lg:w-1/4 mb-12 md:mb-6 lg:mb-0">
          <div className="flex gap-1 items-center">
            <Logo className="size-8" />
            <span className="text-xl font-semibold font-primary">ViewUs</span>
          </div>
          <div className="my-2 text-muted-foreground font-medium">
            A cool platform for developers
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <XTwitter className="size-4 text-muted-foreground" />
            <Linkedin className="size-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col gap-0 w-full lg:w-1/2">
          <div className="w-full lg:w-2/4 mb-6 lg:mb-0">
            <h3 className="text-sm md:text-lg font-semibold mb-4 font-primary">
              Why Viewus
            </h3>
            <ul className="grid text-muted-foreground text-sm gap-2">
              <li>
                <Link href="/about">About us</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-2/4 mb-6 lg:mb-0">
            <h3 className="text-sm md:text-lg font-semibold mb-4 font-primary">
              Socials
            </h3>
            <ul className="grid text-muted-foreground text-sm gap-2">
              <li>
                <Link href="https://cal.com/ankur-sharma/15min">Call Us</Link>
              </li>
              <li>
                <Link href="https://x.com/ankursharma1493">Twitter</Link>
              </li>
              <li>
                <Link href="https://github.com/Ankur1493/viewUs-sec">
                  Github
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full lg:w-3/4 mb-6 lg:mb-0">
            <h3 className="text-sm md:text-lg font-semibold mb-4 font-primary">
              Articles
            </h3>
            <ul className="grid text-muted-foreground text-sm  gap-2">
              <li>
                <Link href="/blogs/manage-testimonials">
                  How to manage testimonials
                </Link>
              </li>
              <li>
                <Link href="/blogs/collect-testimonials">
                  Collect testimonials easily
                </Link>
              </li>
              <li>
                <Link href="/blogs/share-testimonials">
                  Share testimonials in seconds
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
