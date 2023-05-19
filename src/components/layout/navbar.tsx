"use client";

import Link from "next/link";
import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "@/components/common/logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { User } from "@/api/user/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { World } from "@/api/world/types";
import { SideNavigation } from "@/components/layout/side-navigation";

const navbarVariants = cva(
  ["flex", "justify-between", "items-center", "gap-8"],
  {
    variants: {
      variant: {
        open: ["mb-6", "lg:mb-10"],
        bordered: [
          "border-b",
          "border-b-neutral-6",
          "h-[4.5rem]",
          "px-6",
          "lg:px-10",
          "bg-neutral-2",
        ],
      },
    },
  }
);

interface NavbarProps extends VariantProps<typeof navbarVariants> {
  user: User | null;
  world?: World;
  worldList?: World[];
}

interface UserMenuProps {
  user: User;
}

function UserMenu(props: UserMenuProps) {
  const { user } = props;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar_url ?? undefined} />
            <AvatarFallback>
              <Icon name="User" />
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start">
            <span className="text-body-semibold-400">{user.username}</span>
            <span className="text-body-regular-200">{user.email}</span>
          </div>

          <Icon name="ChevronDown" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        alignOffset={4}
        className="w-[var(--radix-dropdown-menu-trigger-width)]"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>

          <DropdownMenuItem>Settings</DropdownMenuItem>

          <DropdownMenuItem>Help Center</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Sign Out</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="text-body-semibold-300 text-primary-11">
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Navbar(props: NavbarProps) {
  const { user, world, worldList, variant } = props;
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/community", label: "Community" },
    { href: "/blog", label: "Blog" },
  ];

  const userLinks = [
    { href: "/", label: "Profile" },
    { href: "/marketplace", label: "Settings" },
    { href: "/community", label: "Help Center" },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className={navbarVariants({ variant })}>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetTrigger asChild>
          <Button
            iconButton
            className="flex xl:hidden"
            color="neutral"
            variant="text"
          >
            <Icon name="Menu" />
          </Button>
        </SheetTrigger>

        <SheetContent className="flex max-w-[300px]" position="left">
          {world && worldList && (
            <SideNavigation
              className="w-full"
              currentWorld={world}
              worldList={worldList}
            />
          )}
        </SheetContent>
      </Sheet>

      <Link className="flex-1" href="/">
        <Logo />
      </Link>

      <NavigationMenu className="hidden lg:flex">
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.href}>
              <Link legacyBehavior passHref href={link.href}>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="hidden flex-1 items-center justify-end gap-2 lg:flex">
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

      <div className="flex flex-1 justify-end lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button iconButton color="neutral" variant="text">
              <Icon name="Menu" />
            </Button>
          </SheetTrigger>

          <SheetContent className="flex max-w-[300px] flex-col p-6">
            {user && (
              <div className="flex gap-2">
                <div className="mr-2 flex cursor-pointer items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.avatar_url ?? undefined} />
                    <AvatarFallback>
                      <Icon name="User" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start">
                    <span className="text-body-semibold-400">
                      {user.username}
                    </span>
                    <span className="text-body-regular-200">{user.email}</span>
                  </div>
                </div>

                <ThemeToggle />

                <Button iconButton color="neutral" variant="text">
                  <Icon name="Bell" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            )}

            <div className="flex-1">
              <NavigationMenu className="justify-start">
                <NavigationMenuList className="flex-col items-start space-x-0">
                  {links.map((link) => (
                    <NavigationMenuItem key={link.href}>
                      <Link legacyBehavior passHref href={link.href}>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {link.label}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {!user && (
              <div className="flex flex-col gap-4">
                <Link href="/auth/sign-in">
                  <Button fullWidth>Join DiceForge</Button>
                </Link>
              </div>
            )}

            {user && (
              <div>
                <NavigationMenu className="mb-6 justify-start">
                  <NavigationMenuList className="flex-col items-start space-x-0">
                    {userLinks.map((link) => (
                      <NavigationMenuItem key={link.href}>
                        <Link legacyBehavior passHref href={link.href}>
                          <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}

                    <NavigationMenuItem
                      className={navigationMenuTriggerStyle()}
                    >
                      Sign Out
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <Button fullWidth>Upgrade to Pro</Button>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
