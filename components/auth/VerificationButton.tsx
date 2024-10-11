"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { generateVerificationTokens } from "@/lib/tokens"

export const VerificationButton = ({ email }: { email: string }) => {

  const [sent, setSent] = useState(false)
  const sendVerificationLink = async () => {
    const verificationToken = await generateVerificationTokens(email)
    if (verificationToken) setSent(true)
  }

  return (
    <div>
      <Button onClick={sendVerificationLink} variant="link" className="p-0">Resend email</Button>
      {sent ? (<h1>mail sent</h1>) : (<h1></h1>)}
    </div>
  )
}
