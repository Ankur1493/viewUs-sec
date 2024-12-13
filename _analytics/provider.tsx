// app/providers.js
'use client'
import { useSession } from 'next-auth/react'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: "/ingest",
    ui_host: "https://app.posthog.com",
  })
}
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}><PostHogAuthWrapper>{children}</PostHogAuthWrapper></PostHogProvider>
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const session = useSession()
  const user = session.data?.user

  useEffect(() => {
    if (user) {
      posthog.identify(user.id, { email: user.email })
    } else {
      posthog.reset()
    }
  }, [session])

  return children
}
