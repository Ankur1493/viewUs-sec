import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center">
      <Button>Click Me</Button>
      <p className="font-bold text-6xl">Hi I am Ankur</p>
    </div>
  );
}
