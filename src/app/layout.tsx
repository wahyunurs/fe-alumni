import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from 'sonner';

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

export const metadata: Metadata = {
  title: "Alumni Udinus",
  description: "Alumni Udinus Web Next js 14",
  icons: {
    icon: "/logo/sti-logo.png"
  }
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return ( 
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} >
          <Toaster position='top-right' duration={5000} closeButton richColors  />
          {children}
      </body>
    </html>
  );
}
