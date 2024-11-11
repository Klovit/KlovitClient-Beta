import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/user/app-sidebar";
import Cookies from "js-cookie";
import { type ReactNode } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@radix-ui/react-navigation-menu';
import { ModeToggle } from "@/components/user/ModeToggle";
import { useEffect, useState } from "react";

export default function Sidebar({ children, coinsenabled, storeenabled, earningenabled }: { coinsenabled: boolean, storeenabled: boolean, earningenabled: boolean, children: ReactNode }) {
  const [defaultOpen, setDefaultOpen] = useState(false);

  useEffect(() => {
    // Get the value of the "sidebar:state" cookie
    const sidebarState = Cookies.get("sidebar:state");

    // Set the defaultOpen state based on the cookie value (assumes "true" means open)
    if (sidebarState === "true") {
      setDefaultOpen(true);
    } else {
      setDefaultOpen(false);
    }
  }, []);
  return (
    <SidebarProvider defaultOpen={defaultOpen} className="w-max">
      <AppSidebar storeenabled={storeenabled} coinsenabled={coinsenabled} earningenabled={earningenabled} />
      
      <main className="w-max h-2">
        
        <header className="flex items-center sticky justify-between mr-8 mt-2">
        <SidebarTrigger />
        <ModeToggle />
      </header>
        {children}
      </main>
      
    </SidebarProvider>
  );
}
