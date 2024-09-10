import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowUpRight, MessageSquare } from "lucide-react";

export default function Page() {
  return (
    <div>
      <Card className="flex flex-col justify-center items-center bg-gradient-to-br from-red-400 via-red-300 to-pink-400 min-h-64">
        <CardHeader>
          <MessageSquare size={80} className="text-gray-800" />
        </CardHeader>
        <CardContent>
          <p className="text-gray-800">Looks like you have entered a wrong URL</p>
          <Link href="/" className="flex gap-4 text-4xl text-white hover:text-gray-200">Collect your own testimonials  with ViewUs.in <ArrowUpRight /> </Link >
        </CardContent>
      </Card>
    </div>
  )
}
