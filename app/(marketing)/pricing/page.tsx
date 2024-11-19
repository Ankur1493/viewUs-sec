import { Footer } from "@/components/Footer";
import { StartFree } from "@/components/landing/StartFree";
import Navbar from "@/components/Navbar";
import { Pricing } from "@/components/pricing/Pricing";

export default function PricingPage() {
  return (
    <div className="flex flex-col items-center relative top-0 w-full transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <Navbar active="pricing" />
      <div className="w-screen flex items-center mt-8 justify-center">
        <StartFree />
      </div>
      <div className="h-full w-screen flex items-center justify-center">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
}
