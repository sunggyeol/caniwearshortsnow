import { Analytics } from "@vercel/analytics/react"
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Can I Wear Shorts Now?",
  description: "Simple weather app to know if you can wear shorts today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
