import { useRouter } from "next/router";

import {
  SideNav,
  SideNavGroup,
  SideNavItem,
  SideNavProps,
} from "@/components/ui/sidenav";
import { useWorld, useWorlds } from "@/api/world/requests";
import { IconName } from "@/components/ui/icon";
import WorldSwitcher from "@/components/layout/world-switcher";
import { Input } from "@/components/ui/input";

interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}

export default function SideNavigation(props: SideNavProps) {
  const router = useRouter();
  const { worldList } = useWorlds();
  const { world } = useWorld(Number(router.query.id));

  const contentLinks: NavLink[] = [
    { href: `/world/${world?.id}/campaigns`, label: "Campaigns", icon: "Book" },
    { href: `/world/${world?.id}/locations`, label: "Locations", icon: "Map" },
    {
      href: `/world/${world?.id}/library`,
      label: "Library",
      icon: "Newspaper",
    },
    {
      href: `/world/${world?.id}/rules`,
      label: "House Rules",
      icon: "ClipboardCheck",
    },
  ];

  const creationLinks: NavLink[] = [
    {
      href: `/world/${world?.id}/artifacts`,
      label: "Artifacts",
      icon: "Archive",
    },
    { href: `/world/${world?.id}/npcs`, label: "NPCs", icon: "Users" },
    { href: `/world/${world?.id}/monsters`, label: "Monsters", icon: "Ghost" },
    {
      href: `/world/${world?.id}/encounters`,
      label: "Encounters",
      icon: "Swords",
    },
    {
      href: `/world/${world?.id}/organizations`,
      label: "Organizations",
      icon: "Network",
    },
    { href: `/world/${world?.id}/items`, label: "Items", icon: "Wand" },
  ];

  return (
    <SideNav {...props}>
      <WorldSwitcher currentWorld={world} worldList={worldList} />

      <div className="flex group-[.collapsed]:hidden">
        <Input
          className="md:min-w-full"
          placeholder="Search..."
          startIcon="Search"
        />
      </div>

      <SideNavGroup title="Content">
        {contentLinks.map((link) => (
          <SideNavItem href={link.href} icon={link.icon} key={link.href}>
            {link.label}
          </SideNavItem>
        ))}
      </SideNavGroup>

      <SideNavGroup title="Creations">
        {creationLinks.map((link) => (
          <SideNavItem href={link.href} icon={link.icon} key={link.href}>
            {link.label}
          </SideNavItem>
        ))}
      </SideNavGroup>

      <SideNavGroup className="mt-auto">
        <SideNavItem href="/help-center" icon="LifeBuoy">
          Help Center
        </SideNavItem>
        <SideNavItem href={`/world/${world?.id}/settings`} icon="Settings">
          Settings
        </SideNavItem>
      </SideNavGroup>
    </SideNav>
  );
}
