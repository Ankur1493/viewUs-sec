import { Faq } from "@/components/landing/new/faq";
import { Features } from "@/components/landing/new/features";
import { Footer } from "@/components/landing/new/footer";
import { Hero } from "@/components/landing/new/hero";
import { Navbar } from "@/components/landing/new/navbar";
import { Oss } from "@/components/landing/new/oss";
import { Working } from "@/components/landing/new/working";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto w-full">
      <div className="px-4 pb-10">
        <Navbar />
        <Hero />
        <Features />
        <Working />
        <Oss />
        <Faq />
        <Footer />
      </div>
    </main>
  );
}
