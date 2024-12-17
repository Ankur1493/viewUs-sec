"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Cal from "@calcom/embed-react";

export const BookCall = () => {
  return (
    <div className="max-w-7xl mx-auto w-full flex flex-col gap-7 rounded-3xl p-3 pb-10 lg:pb-0">
      <div className="py-4 flex flex-col gap-6">
        <p className="text-gray-400 font-thin font-mono text-md">FAQs</p>
        <h1 className="text-white text-4xl md:text-5xl">
          Still confused? Let&apos;s talk
        </h1>
      </div>
      <div className="text-white flex flex-col lg:flex-row justify-around">
        <Accordion type="single" collapsible className="w-full lg:w-2/3">
          <AccordionItem value="item-1">
            <AccordionTrigger>Who can use ViewUs?</AccordionTrigger>
            <AccordionContent>
              Any business wanting to showcase customer testimonials.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>
              You share a link with customers, they either submit text review or
              upload video, and you embed them on your site.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I embed testimonials?</AccordionTrigger>
            <AccordionContent>
              Copy the embed code from your dashboard and paste it into your
              website.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Can I customize the widget?</AccordionTrigger>
            <AccordionContent>
              Yes, you can match the widget to your brand’s look.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is it easy to use?</AccordionTrigger>
            <AccordionContent>
              Absolutely! No coding skills are required.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center justify-center">
          <Card className="h-[300px] bg-gray-200 lg:min-h-[350px] border-dashed border-gray-950">
            <CardHeader>
              <CardTitle>Have a call with us</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 justify-center items-center">
              <p className="text-gray-800 font-normal text-md">
                Schedule a 15 minutes call with Ankur,
                <span className="block">
                  {" "}
                  and setup your testimonials together
                </span>
              </p>
              <Link
                href="/#book-call"
                className="hidden lg:flex justify-around items-center border-dashed border border-gray-400 p-2 rounded-lg w-full hover:bg-[#141111] hover:text-white duration-500"
              >
                <Image
                  className="h-12 w-12 rounded-lg"
                  width={100}
                  height={100}
                  src="/assets/images/founder_profile.jpeg"
                  alt="Profile"
                />
                <p className="text-md font-normal underline flex gap-3">
                  Book a call <MoveRight />{" "}
                </p>
              </Link>
              <Link
                href="https://cal.com/ankur-sharma/15min"
                className="flex lg:hidden justify-around items-center border-dashed border border-gray-400 p-2 rounded-lg w-full hover:bg-[#141111] hover:text-white duration-500"
              >
                <Image
                  className="h-12 w-12 rounded-lg"
                  width={100}
                  height={100}
                  src="/assets/images/founder_profile.jpeg"
                  alt="Profile"
                />
                <p className="text-md font-normal underline flex gap-3">
                  Book a call <MoveRight />{" "}
                </p>
              </Link>
              <div className="flex gap-2 font-normal text-sm text-gray-800">
                <p className="flex gap-2 items-center">
                  or email
                  <MoveRight size={15} />{" "}
                </p>
                <Link
                  className="border-b border-b-gray-600 "
                  href="mailto://team@viewus.in"
                >
                  team@viewus.in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div id="book-call" className="mt-16 hidden lg:block">
        <div className="py-8 flex flex-col gap-6">
          <p className="text-gray-400 font-thin font-mono text-md">
            Time to take Action
          </p>
          <h1 className="text-white text-4xl md:text-5xl">
            Book your spot, Let us help you
          </h1>
        </div>
        <div className="max-h-[600px] overflow-y-auto scrollbar-hidden">
          <Cal calLink="ankur-sharma/15min"></Cal>
        </div>
      </div>
    </div>
  );
};
