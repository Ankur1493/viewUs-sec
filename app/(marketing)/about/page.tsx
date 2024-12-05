import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { About } from "@/components/about/About";
import { BookCall } from "@/components/landing/BookCall";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center absolute top-0 w-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <Navbar active="about" />
      <About />
      <div className="flex flex-col justify-center items-center mt-24 font-bold text-center w-full bg-[#141111]">
        <BookCall />
      </div>
      <Footer />
    </div>
  );
}
