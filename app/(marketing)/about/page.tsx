import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { About } from "@/components/about/About";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center absolute top-0 w-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <Navbar active="about" />
      <About />
      <Footer />
    </div>
  );
}
