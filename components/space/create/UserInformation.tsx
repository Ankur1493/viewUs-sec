"use client"

import { useSpaceDataStore, UserInformation as UserInformationType } from "@/store/useSpaceDataStore"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { } from "@/store/useSpaceDataStore"
import { useRouter } from "next/navigation"

export const UserInformation = () => {
  const { userInformation, setUserInformation } = useSpaceDataStore()
  const router = useRouter()

  const handleCheckboxChange = (field: keyof UserInformationType) => {
    setUserInformation({
      ...userInformation,
      [field]: !userInformation[field],
    })
  }
  //improve the preview section, also add image kinda section in preview

  return (
    <div className="w-full max-h-screen h-full flex justify-center items-center">
      <div className="w-1/2 space-y-6">
        <h1 className="text-2xl font-bold">What info do you want to collect from your users?</h1>
        <p className="text-muted-foreground">
          This information can be displayed with customer testimonials. User emails will remain private for safety concerns.
        </p>

        <div className="space-y-4">
          {(Object.entries(userInformation) as [keyof UserInformationType, boolean][]).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <Label>{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
              <Checkbox
                checked={value}
                onCheckedChange={() => handleCheckboxChange(key)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div className="space-y-4">
          {(Object.entries(userInformation) as [keyof UserInformationType, boolean][]).map(([key, value]) =>
            <div key={key}>
              <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()} {value && "*"}</Label>
              <input
                type={key === 'email' ? 'email' : 'text'}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                disabled
              />
            </div>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <Button onClick={() => { router.push("/space/create?page=1") }} variant="outline">Back</Button>
          <Button onClick={() => { router.push("/space/create?page=3") }} >Next</Button>
        </div>
      </div>
    </div>
  )
}
