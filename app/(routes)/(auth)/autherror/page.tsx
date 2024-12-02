import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function AuthErrorPage() {
  return (
    <Card className="w-full mx-3 xl:mx-0 xl:w-1/4 flex  flex-col border-none">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl">Login Error</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Please login from the same method you used last time, as of now we do not support this</p>
      </CardContent>

      <CardFooter >

        <Link href="/login" className="flex"><span className="text-blue-800 underline underline-offset-2">Go to Login </span></Link>

      </CardFooter>
    </Card>

  )
}
