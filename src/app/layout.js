import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ReduxProvider from "@/redux/ReduxProvider";  // ✅ new wrapper
import ClientWrapper from "./client-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "NEXT JS PORTFOLIO",
  description: "CREATED BY JUNAID",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
        >
          <ReduxProvider>
           
            <ClientWrapper>{children}</ClientWrapper>
            <Toaster position="top-right" />
            
          </ReduxProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
