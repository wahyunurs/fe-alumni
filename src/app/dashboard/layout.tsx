import type { Metadata } from "next";

import Sidebar from "@/components/sidebar/Sidebar";
import Navigationbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import AutoBreadcrumb from "@/components/dashboard/breadcrumb/PathBreadcrumb";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return <section className="flex h-screen " >
    <Sidebar/>

    <main className="w-full overflow-y-auto flex flex-col min-h-screen sm:bg-[#F2F9FF]" >

      <div className="p-5 flex-grow " >
        <div className="container mx-auto lg:px-7 mb-3 " > 
          <AutoBreadcrumb capitalizeLinks  /> 
        </div> 
        {children} 
      </div>

      <Footer />

    </main>
    
  </section>
  
}
