import type { Metadata } from "next";
import {Inter as FontSans} from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils"
import {auth} from "@/auth";
import {SessionProvider} from "next-auth/react";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {Toaster} from "@/components/ui/toaster";
import Head from "next/head";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Mentor",
  description: "Reussir les concours d'écoles de commerce via les Admissions sur Titre (AST)"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const session = await auth();
  return (
      <SessionProvider session={session}>
          <html lang="en" suppressHydrationWarning>
          <Head>
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <body>
              <main
                  className={cn(
                      "min-h-screen bg-background font-sans antialiased",
                      fontSans.variable
                  )}
              >
              {children}
                  <SpeedInsights />
          </main>
              <Toaster/>
            </body>
          </html>
      </SessionProvider>
)
  ;
}
