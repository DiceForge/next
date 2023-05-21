import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { NavbarLink } from "@/components/layout/types";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface RightnavLinksProps {
  links: NavbarLink[];
  children?: ReactNode;
}

export default function RightnavLinks(props: RightnavLinksProps) {
  const { links, children } = props;
  const router = useRouter();

  return (
    <NavigationMenu className="items-start justify-start">
      <NavigationMenuList className="flex-col items-start space-x-0">
        {links.map((link) => {
          const isActive = router.asPath.startsWith(link.href);

          return (
            <NavigationMenuItem key={link.href}>
              <Link legacyBehavior passHref href={link.href}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  data-active={isActive ? "true" : void 0}
                >
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          );
        })}

        {children}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
