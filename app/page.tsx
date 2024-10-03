import { Landing } from "@/components/landing/Landing";

export default function Home() {
  return (
    <div className="flex flex-col items-center absolute top-0 w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]">
      <Landing />
    </div>
  );
}
