import { ForgetPasswordForm } from "@/components/auth/ForgetPassword"
import { ResetPassword } from "@/components/auth/ResetPassword";
import { getUserByEmail } from "@/data/user";
import { getEmailVerificationTokenByToken } from "@/data/verificationToken";
import { TriangleAlertIcon } from "lucide-react";

export default async function ForgetPasswordPage({ searchParams }: { searchParams: { error: string, token: string } }) {
  const { token, error } = searchParams;

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="bg-[#E9F8FF] p-5 rounded-full"><TriangleAlertIcon color="red" size={30} /></div>
        Seems like you had entered a wrong token. Click on the link shared in the verification mail
      </div>
    )
  }

  if (token) {
    const status = await getEmailVerificationTokenByToken(token)
    if (!status) {
      return (
        <div>We can not find your account at the moment, maybe the token expired or you have entered wrong token</div>
      )
    }
    const user = await getUserByEmail(status.email)
    if (!user) {
      return (
        <div>Not able to find user at the moment</div>
      )
    }

    return (
      <div className="h-screen w-screen justify-center items-center flex">
        <ResetPassword name={user.name} id={user?.id} token={token} />
      </div>
    )

  }

  return (
    <div>
      <ForgetPasswordForm />
    </div>
  )
}
