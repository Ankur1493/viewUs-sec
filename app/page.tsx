import Navbar from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center absolute top-0 w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
        <Navbar />
        <div className="w-screen flex flex-col items-center md:mt-32 mt-16">
          <div className="flex flex-col justify-center items-center w-3/5">
            <h1 className="text-4xl mt-2 md:text-5xl font-bold pb-3 text-center">
              Effortlessly Gather and Showcase Customer Testimonials
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center text-gray-400 md:w-2/5 w-3/4">
            <p className="text-md md:text-xl text-center">
              ViewUs helps you seamlessly collect and manage customer
              testimonials. No developers, no complex setup.
            </p>
          </div>
          <div className="flex gap-2 w-1/6 mt-6">
            <Link
              href={"/upgrade"}
              className="flex-1 p-2 px-3 border-white bg-black text-white text-[20px] font-semibold rounded-xl w-1/2 bg-opacity-90 text-center hover:bg-opacity-80"
            >
              Upgrade
            </Link>
            <Link
              href={"/login"}
              className="p-2 flex-1 px-5 border-white bg-black text-white text-[20px] font-semibold rounded-xl w-1/2 bg-opacity-90 text-center hover:bg-opacity-80"
            >
              SignUp
            </Link>
          </div>
          <div className="py-8">
            <Image
              src="/assets/images/sample.png"
              alt="Sample pic"
              width={1000}
              height={2000}
              className="w-full h-full rounded-xl border border-black border-8"
            />
          </div>
        </div>
      </div>
    </>
  );
}
