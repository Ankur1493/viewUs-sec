import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center absolute top-0 w-screen bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <div className="flex flex-col items-center relative top-0 w-full transform">
        <Navbar active="about" />
      </div>
    </div>
  );
}
