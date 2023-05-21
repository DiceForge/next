import Link from "next/link";
import { useRouter } from "next/router";

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
  const router = useRouter();

  return (
    <NavigationMenu className="hidden xl:flex">
      <NavigationMenuList>
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
      </NavigationMenuList>
    </NavigationMenu>
  );
}
