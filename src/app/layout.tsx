import { Toaster } from "@/features/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";
import NextAuthSessionProvider from "@/lib/providers/next-auth-session-provider";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Stealth",
  description: "Stealth is a medicine inventory management system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          {children}
          <Toaster position="top-right" />
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
