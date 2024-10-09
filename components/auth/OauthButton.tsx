"use client"

import { ChromeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import google from "next-auth/providers/google"
import { DEFAULT_LOGIN_REDIRECT } from "@/route"

export const OauthButton = () => {

  const oauthLogin = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return (
    <Button
      onClick={oauthLogin}
      variant="secondary"
      className="w-full mt-4 flex gap-4 ">
      <p>Continue with Google</p>
      <ChromeIcon />
    </Button>
  )
}

