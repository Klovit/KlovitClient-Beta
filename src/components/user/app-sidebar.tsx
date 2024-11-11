import { Coins, Home, LogOut, Plus, Settings, Settings2, Store } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Deploy",
    url: "/",
    icon: Plus,
  },
  {
    title: "Store",
    url: "#",
    icon: Store,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings2,
  },

]
export function AppSidebar({storeenabled, coinsenabled, earningenabled}) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <div className="h-max w-max grid grid-cols-2">
                  <img src="https://docs.klovit.tech/img/Klovit%20Logo.png" alt="KCLOGO" className=" h-28"></img>
                  <img src="https://cdn.discordapp.com/emojis/1294909899939123200.webp?size=96&quality=lossless" alt="HOSTLOGO" className=" h-28"></img>
                  </div>
          <SidebarGroupLabel>Home</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem key="Home">
                  <SidebarMenuButton asChild>
                    <a href="/">
                      <Home />
                      <span>Home</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
        <SidebarGroupLabel>Server</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem key="Deploy">
                  <SidebarMenuButton asChild>
                    <a href="/server/deploy">
                      <Plus />
                      <span>Deploy</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {coinsenabled &&
        <SidebarGroup>
        <SidebarGroupLabel>Economy</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                {storeenabled && <SidebarMenuItem key="Store">
                  <SidebarMenuButton asChild>
                    <a href="/store">
                      <Store />
                      <span>Store</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>}
                {earningenabled && <SidebarMenuItem key="Earn">
                  <SidebarMenuButton asChild>
                    <a href="/earn">
                      <Coins />
                      <span>Earn</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>}
        <SidebarGroup>
          <SidebarGroupLabel>Other</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
                <SidebarMenuItem key="Logout">
                  <SidebarMenuButton asChild>
                    <a href="/api/auth/signout" data-astro-prefetch="false">
                      <LogOut />
                      <span>Log Out</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
