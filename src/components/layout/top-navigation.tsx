import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Navbar, type NavbarProps } from "@/components/ui/navbar";
import Logo from "@/components/common/logo";
import NavbarLinks from "@/components/layout/navbar-links";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import UserMenu from "@/components/layout/user-menu";
import { useUser } from "@/api/user/requests";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideNavigation from "@/components/layout/side-navigation";
import UserCard from "@/components/layout/user-card";
import RightnavLinks from "@/components/layout/rightnav-links";
import {
  NavigationMenuItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function TopNavigation(props: NavbarProps) {
  const { user } = useUser();
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/community", label: "Community" },
    { href: "/blog", label: "Blog" },
  ];

  const userLinks = [
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
    { href: "/help-center", label: "Help Center" },
  ];

  return (
    <Navbar {...props}>
      <Sheet onOpenChange={setOpen} open={open}>
        {props.variant === "bordered" && (
          <SheetTrigger asChild>
            <Button
              iconButton
              className="flex lg:hidden"
              color="neutral"
              variant="text"
            >
              <Icon name="ChevronsRight" />
            </Button>
          </SheetTrigger>
        )}

        <SheetContent className="flex" position="left">
          <SideNavigation className="w-full" />
        </SheetContent>
      </Sheet>

      <Link href="/">
        <Logo />
      </Link>

      <NavbarLinks links={links} />

      <div className="hidden items-center justify-end gap-2 xl:flex">
        <ThemeToggle />

        {!user && (
          <Link href="/auth/sign-in">
            <Button>Join DiceForge</Button>
          </Link>
        )}

        {user && (
          <>
            <Button iconButton color="neutral" variant="text">
              <Icon name="Bell" />
              <span className="sr-only">Notifications</span>
            </Button>

            <UserMenu user={user} />
          </>
        )}
      </div>

      <div className="flex flex-1 justify-end xl:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button iconButton color="neutral" variant="text">
              <Icon name="Menu" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex flex-col gap-8 p-6">
            {user && (
              <div className="flex gap-4">
                <UserCard user={user} />

                <ThemeToggle />

                <Button iconButton color="neutral" variant="text">
                  <Icon name="Bell" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            )}

            <RightnavLinks links={links} />

            <div className="flex-1" />

            {!user && (
              <div className="flex flex-col gap-4">
                <Link href="/auth/sign-in">
                  <Button fullWidth>Join DiceForge</Button>
                </Link>
              </div>
            )}

            {user && (
              <div className="flex flex-col gap-4">
                <RightnavLinks links={userLinks}>
                  <NavigationMenuItem className={navigationMenuTriggerStyle()}>
                    Sign Out
                  </NavigationMenuItem>
                </RightnavLinks>

                <Button fullWidth>Upgrade to Pro</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </Navbar>
  );
}
