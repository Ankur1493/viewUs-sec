import { LoginForm } from "@/components/auth/LoginForm"
import { Suspense } from "react"

export default function LoginPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
