import Link from "next/link";

import { NavbarLink } from "@/components/layout/types";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavbarLinksProps {
  links: NavbarLink[];
}

export default function NavbarLinks(props: NavbarLinksProps) {
  const { links } = props;

  return (
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
  );
}
