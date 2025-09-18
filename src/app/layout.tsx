import { Toaster } from "@/features/ui/sonner";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ReactNode } from "react";

const APP_NAME = "Zomujo Stealth";
const APP_DEFAULT_TITLE = "Zomujo Stealth - Inventory Management System";
const APP_TITLE_TEMPLATE = "%s - Zomujo Stealth";
const APP_DESCRIPTION =
  "Zomujo Stealth is an inventory management system designed to help you track and manage your medicine inventory efficiently.";

export const metadata: Metadata = {
  metadataBase: new URL("https://medsyncgh.com"),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  category: "website",
  generator: "Next.js",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
