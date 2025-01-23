import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import "./globals.css";
import Footer from "@/components/shared/footer";
import { Toaster } from "@/components/ui/toaster"
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roger Bavibidila - Portfolio",
  description: "Full Stack Developer and Machine Learning Engineer specializing in AI, Deep Learning, and Scalable Web Applications",
  icons: {
    icon: "/favicon.ico",
  },
};

// Lazy load the AI Assistant component
const AIAssistant = React.lazy(() => import("@/components/shared/ai-assistant"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
            
          </main>
          <div className="fixed bottom-0 right-0 z-50">
            <AIAssistant />
          </div>
          <Footer/>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}