"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { generateVerificationTokens } from "@/actions/tokens"
import { toast } from "sonner"

export const VerificationButton = ({ email }: { email: string }) => {

  const [sent, setSent] = useState(false)
  const sendVerificationLink = async () => {
    setSent(true)
    const verificationToken = await generateVerificationTokens(email)
    toast(verificationToken.message)
    setSent(false)
  }

  return (
    <div>
      <Button onClick={sendVerificationLink} variant="link" className="p-0" disabled={sent}>Resend email</Button>
    </div>
  )
}
