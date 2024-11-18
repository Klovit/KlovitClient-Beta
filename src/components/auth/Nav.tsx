import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuTrigger,
    NavigationMenuContent,
    NavigationMenuLink,
  } from '@radix-ui/react-navigation-menu';
  import { ModeToggle } from "@/components/user/ModeToggle";
  
  export default function Nav() {
    return (
      <header className="flex justify-between items-center p-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger asChild>
                <a href="/">
                  <img
                    className="ml-4"
                    src="https://docs.klovit.tech/img/Klovit%20Logo.png"
                    height={30}
                    width={40}
                    alt="icon"
                  />
                </a>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ModeToggle />
      </header>
    );
  }
  