import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"

import { ToasterProvider } from "@/providers/toaster-provider";
import ModalsProviders from "@/providers/modals-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Carta",
  description:
    "Demo de carta digital. Una web donde podrás administrar tu carta y tus pedidos.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="es">
        <body
          className={`${inter.className} min-h-screen`}
        >
          <ToasterProvider />
          <ModalsProviders />
          <div className="h-full">
            {children}
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}