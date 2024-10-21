import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Card className="flex flex-col border-none shadow-none">
        <CardHeader>
          <div className="bg-[#E9F8FF] w-fit p-5 rounded-full">
            <TriangleAlert color="red" size={30} />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-[36px] font-[500] mb-4">
            Looks like you have entered a wrong URL
          </p>
          <Link
            href="/"
            className="text-[14px] font-[400] flex items-center gap-5"
          >
            <Button variant="form" className="rounded-3xl">
              Collect your own testimonials with ViewUs.in{" "}
              <ArrowUpRight size={20} />{" "}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
