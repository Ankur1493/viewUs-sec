"use client"

import axios from "axios"
import { Button } from "../ui/button"

export const VerificationButton = ({ email }: { email: string }) => {

  const sendVerificationLink = async () => {
    const sendMail = await axios.post("/api/send", { email, type: "verification" })
    const response = await sendMail.data
    console.log(response)
  }

  return (
    <div>
      <Button onClick={sendVerificationLink}>Send Verification Link</Button>
    </div>
  )
}
