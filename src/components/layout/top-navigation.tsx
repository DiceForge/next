import Link from "next/link";

import { getUser } from "@/api/user/actions";
import { Navbar, type NavbarProps } from "@/components/ui/navbar";
import Logo from "@/components/common/logo";
import NavbarLinks from "@/components/layout/navbar-links";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import UserMenu from "@/components/layout/user-menu";

export default async function TopNavigation(props: NavbarProps) {
  const user = await getUser();

  const links = [
    { href: "/", label: "Home" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/community", label: "Community" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <Navbar {...props}>
      <Link href="/">
        <Logo />
      </Link>

      <NavbarLinks links={links} />

      <div className="hidden items-center justify-end gap-2 lg:flex">
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
    </Navbar>
  );
}
