"use server"

import { sendSupportMail } from "@/lib/mail";

export default async function sendSupportAndHelpMail({ email, message, type }: { email: string, message: string, type: string }) {
  await sendSupportMail({ email, message, type })

}
