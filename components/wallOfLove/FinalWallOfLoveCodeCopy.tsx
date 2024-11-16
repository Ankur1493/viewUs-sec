import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useWallTypeStore } from "@/store/useWallTypeStore"
import { ArrowLeftIcon, Copy, Check, PartyPopperIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export const FinalWallOfLoveCodeCopy = () => {
  const { url, data, setPage } = useWallTypeStore()
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url!)
      setIsCopied(true)
      toast("copied the URL")
      setTimeout(() => setIsCopied(false), 2000) // Reset after 2 seconds
    } catch (err) {
      toast("failed")
    }
  }

  return (
    <div className="flex flex-col gap-7">
      <Button className="w-fit" onClick={() => setPage("editing", data)}>
        <ArrowLeftIcon className="mr-2 h-4 w-4" /> Go back
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Copy the Wall of Love Code</CardTitle>
          <CardDescription>Paste this code where you want to showcase this wall</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <code className="bg-muted px-2 py-1 rounded-md flex-grow mr-2 overflow-x-auto">
            {url}
          </code>
          <Button
            size="icon"
            variant="outline"
            onClick={copyToClipboard}
            className="flex-shrink-0 transition-all duration-200 ease-in-out"
          >
            {isCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">{isCopied ? "Copied" : "Copy URL"}</span>
          </Button>
        </CardContent>
      </Card>
      <Button className="w-fit" onClick={() => setPage("all", null)}>
        <PartyPopperIcon className="mr-2 h-4 w-4" /> Done
      </Button>
    </div>
  )
}
