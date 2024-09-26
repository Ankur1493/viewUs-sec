import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <Image
        src="https://thewowstyle.com/wp-content/uploads/2015/01/images-of-nature-4.jpg"
        width={5000}
        height={20000}
        alt=""
      />
    </>
  );
}
