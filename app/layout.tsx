import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JULES-CORE CLOUD SCRIPTS",
  description: "Advanced Cloud Script Management System",
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
