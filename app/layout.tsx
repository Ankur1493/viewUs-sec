import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { CSPostHogProvider } from "@/_analytics/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const rethinkSans = localFont({
  src: [
    {
      path: "../public/fonts/rethink-sans/regular.ttf",
      weight: "400",
    },
    {
      path: "../public/fonts/rethink-sans/medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/rethink-sans/semi-bold.ttf",
      weight: "600",
    },
    {
      path: "../public/fonts/rethink-sans/bold.ttf",
      weight: "700",
    },
    {
      path: "../public/fonts/rethink-sans/extra-bold.ttf",
      weight: "800",
    },
  ],
  variable: "--font-rethink",
  display: "swap",
});

const creato_display = localFont({
  src: [
    {
      path: "../public/fonts/creato-display/light.otf",
      weight: "400",
    },
    {
      path: "../public/fonts/creato-display/regular.otf",
      weight: "500",
    },
    {
      path: "../public/fonts/creato-display/medium.otf",
      weight: "600",
    },
    {
      path: "../public/fonts/creato-display/bold.otf",
      weight: "700",
    },
    {
      path: "../public/fonts/creato-display/extra-bold.otf",
      weight: "800",
    },
  ],
  variable: "--font-creato-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viewus",
  description: "Collect and manage testimonials",
  openGraph: {
    title: "Viewus",
    description: "Collect and manage testimonials",
    images: ["/assets/images/logo.png"],
    url: "https://www.viewus.in/",
  },
  twitter: {
    title: "Viewus",
    description: "Collect and manage testimonials",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${creato_display.variable} ${rethinkSans.variable} font-secondary bg-accent/30 w-full`}
      >
        <SessionProvider>
          <CSPostHogProvider>
            <SidebarProvider>{children}</SidebarProvider>
          </CSPostHogProvider>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
