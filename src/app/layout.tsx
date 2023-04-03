"use client";
import { Layout } from "@/components/Layout";
import { PhoneBookProvider } from "@/context/phoneBook.context";
import { Toaster } from "./Toaster";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Layout>
          <PhoneBookProvider>
            {children}
            <Toaster />
          </PhoneBookProvider>
        </Layout>
      </body>
    </html>
  );
}
