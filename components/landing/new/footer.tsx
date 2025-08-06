import { Cta } from "./cta";
import { Footer as FooterCore } from "@/components/Footer";

export const Footer = () => {
  return (
    <footer className="min-h-[40rem] drop-shadow-lg md:drop-shadow-2xl w-full max-h-fit bg-white rounded-[2.5rem] p-2 ">
      <Cta />
      <div className="p-4">
        <FooterCore />
      </div>
    </footer>
  );
};
