"use client";

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"

const testimonials = [
  {
    item: 1,
    content:"This is my application so I'll only say good things about it. It's the piece of crap. Although it took me so much time and energy to build. I'm proud of it.",
    author: "Manu Arora",
    role: "Senior Meme Officer",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/assets/images/test1.webp"
  },
  {
    item: 2,
    content: "What did you get done this week? stop with this application and start fixing the search damnit.",
    author: "Elon Must",
    role: "Shitposter CEO, Developer, Writer, Memer, etc.",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    item: 3,
    content: "project mayhem but it didn't work. I don't know why. I'm not a developer. I'm a salesman. I sell soap. Also this platform is hella expensive.",
    author: "Tyler Durden",
    role: "Project Mayhem Coordinator",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    item: 4,
    content: "Harry Potter, the boy who bought Foxtrot Analytics. He is stronger than me now. Highly recommended.",
    author: "Lord Voldemort",
    role: "Head boy at Slytherin House",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/assets/images/test3.webp"
  },
  {
    item: 2,
    content: "project mayhem but it didn't work. I don't know why. I'm not a developer. I'm a salesman. I sell soap. Also this platform is hella expensive.",
    author: "Tyler Durden",
    role: "Project Mayhem Coordinator",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    item: 1,
    content: "Backed by Wayne enterprises, Foxtrot is the best platform any business can ever imagine. Worth every penny.",
    author: "Bruce Wayne",
    role: "CEO of Wayne Enterprises",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/assets/images/test2.webp"
  },
  {
    item: 1,
    content: "Harry Potter, the boy who bought Foxtrot Analytics. He is stronger than me now. Highly recommended.",
    author: "Lord Voldemort",
    role: "Head boy at Slytherin House",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    item: 2,
    content: "project mayhem but it didn't work. I don't know why. I'm not a developer. I'm a salesman. I sell soap. Also this platform is hella expensive.",
    author: "Tyler Durden",
    role: "Project Mayhem Coordinator",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/assets/images/test2.webp"
  },
  {
    item: 1,
    content: "Backed by Wayne enterprises, Foxtrot is the best platform any business can ever imagine. Worth every penny.",
    author: "Bruce Wayne",
    role: "CEO of Wayne Enterprises",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/assets/images/test3.webp"
  },
  {
    item: 2,
    content: "Harry Potter, the boy who bought Foxtrot Analytics. He is stronger than me now. Highly recommended.",
    author: "Lord Voldemort",
    role: "Head boy at Slytherin House",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  {
    item: 1,
    content: "I am groot. I am groot, I am groot, I am groot. I AM GROOOOOT!",
    author: "Groot",
    role: "Groot at Groot Industries",
    avatar: "/placeholder.svg?height=40&width=40"
  }
];

export default function HardCodedTestimonials() {
  const columnSpeeds = [10, 5, 8];

  const controls = [useAnimation(), useAnimation(), useAnimation()];

  useEffect(() => {
    controls.forEach((control, index) => {
      const animate = async () => {
        await control.start({
          y: [0, -150 * (testimonials.length / 3)],  // Divide by 3 as we now have 3 columns
          transition: {
            y: {
              repeat: Infinity,
              duration: columnSpeeds[index],
              ease: "linear",
            },
          },
        });
      };
      animate();
    });
  }, [controls]);

  const columns = [
    testimonials.slice(0, Math.ceil(testimonials.length / 3)),
    testimonials.slice(Math.ceil(testimonials.length / 3),Math.ceil((2 * testimonials.length) / 3)),
    testimonials.slice(Math.ceil((2 * testimonials.length) / 3)),
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[700px]">
          <div className="absolute -top-12 left-0 right-0 h-20 bg-gradient-to-b from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute -bottom-12 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
          <div className="absolute w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {columns.map((column, columnIndex) => (
              <motion.div
                key={columnIndex}
                className="space-y-8"
                animate={controls[columnIndex]}
              >
                {column.concat(column).map((testimonial, index) => (
                  <div key={index} className={cn("bg-white overflow-hidden shadow-md rounded-lg", testimonial.item % 2 === 0 ? "bg-gray-950 shadow-gray-500" : "")}>
                    <div className="px-4 py-5 sm:p-6">
                      <p className="text-base text-gray-500 mb-4">{testimonial.content}</p>
                      {testimonial.image && 
                        (<div className="flex items-center justify-center w-full py-2">
                          <Image
                            className="h-[200px] w-[300px] rounded-xl"
                            src={testimonial.image}
                            alt={testimonial.author}
                            width={300}
                            height={300}
                          />
                        </div>
                      )}
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Image
                            className="h-10 w-10 rounded-full"
                            src="/assets/images/avatar.webp"
                            alt={testimonial.author}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-3">
                          <p className={cn( "text-sm font-medium text-gray-900", testimonial.item % 2 === 0 ? "text-gray-50" : "" )} >{testimonial.author}</p>
                          <p className="text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
