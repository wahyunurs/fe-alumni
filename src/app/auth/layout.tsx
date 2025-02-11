import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Page for sign Alumni."
};

export default function AuthLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <main className="h-screen flex items-center justify-center " >
      {children}
    </main>
  )
  
}
