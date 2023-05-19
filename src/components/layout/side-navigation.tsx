"use client";

import Link from "next/link";
import { useState } from "react";

import {
  SideNav,
  SideNavGroup,
  SideNavItem,
  SideNavProps,
} from "@/components/ui/sidenav";
import { World } from "@/api/world/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props extends SideNavProps {
  currentWorld: World;
  worldList: World[];
}

interface SideNavSwitcherProps {
  currentWorld: World;
  worldList: World[];
  onToggleExpand: () => void;
}

function SideNavSwitcher(props: SideNavSwitcherProps) {
  const { currentWorld, worldList, onToggleExpand } = props;

  return (
    <div className="flex items-center gap-2 group-[.collapsed]:flex-col-reverse">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Icon
          className="min-w-[20px] text-neutral-11 group-[.collapsed]:hidden"
          name="Globe"
          size={20}
        />

        <span className="truncate text-body-semibold-400 group-[.collapsed]:hidden">
          {currentWorld.name}
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button iconButton color="neutral" size="small" variant="text">
              <Icon name="ChevronsUpDown" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuLabel>Worlds</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {worldList.map((world) => (
                <Link href={`/worlds/${world.id}/settings`} key={world.id}>
                  <DropdownMenuItem
                    active={world.id === currentWorld.id}
                    className="truncate"
                  >
                    {world.name}
                  </DropdownMenuItem>
                </Link>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem size="small">Create New World</DropdownMenuItem>
              <DropdownMenuItem size="small">
                Duplicate Current World
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="m:flex hidden">
        <Button
          iconButton
          color="neutral"
          onClick={onToggleExpand}
          size="small"
          variant="text"
        >
          <Icon name="ChevronsRight" />
        </Button>
      </div>
    </div>
  );
}

export function SideNavigation(props: Props) {
  const { currentWorld, worldList, ...rest } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SideNav collapsed={collapsed} {...rest}>
      <SideNavSwitcher
        currentWorld={currentWorld}
        onToggleExpand={() => setCollapsed((prev) => !prev)}
        worldList={worldList}
      />

      <div className="group-[.collapsed]:hidden">
        <Input
          className="min-w-full"
          placeholder="Search..."
          startIcon="Search"
        />
      </div>

      <SideNavGroup title="Content">
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/campaigns`}
        >
          <SideNavItem icon="Book">Campaigns</SideNavItem>
        </Link>
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/locations`}
        >
          <SideNavItem icon="Map">Locations</SideNavItem>
        </Link>
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/library`}
        >
          <SideNavItem icon="Newspaper">Library</SideNavItem>
        </Link>
        <Link legacyBehavior passHref href={`/worlds/${currentWorld.id}/rules`}>
          <SideNavItem icon="ClipboardCheck">House Rules</SideNavItem>
        </Link>
      </SideNavGroup>

      <SideNavGroup title="Creations">
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/artifacts`}
        >
          <SideNavItem icon="Archive">Artifacts</SideNavItem>
        </Link>
        <Link legacyBehavior passHref href={`/worlds/${currentWorld.id}/npcs`}>
          <SideNavItem icon="Users">NPCs</SideNavItem>
        </Link>
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/monsters`}
        >
          <SideNavItem icon="Ghost">Monsters</SideNavItem>
        </Link>
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/locations`}
        >
          <SideNavItem icon="Swords">Encounters</SideNavItem>
        </Link>
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/organizations`}
        >
          <SideNavItem icon="Network">Organizations</SideNavItem>
        </Link>
        <Link legacyBehavior passHref href={`/worlds/${currentWorld.id}/items`}>
          <SideNavItem icon="Wand">Items</SideNavItem>
        </Link>
      </SideNavGroup>

      <SideNavGroup className="mt-auto">
        <Link legacyBehavior passHref href="/help-center">
          <SideNavItem icon="LifeBuoy">Help Center</SideNavItem>
        </Link>
        <Link
          legacyBehavior
          passHref
          href={`/worlds/${currentWorld.id}/settings`}
        >
          <SideNavItem icon="Settings">Settings</SideNavItem>
        </Link>
      </SideNavGroup>
    </SideNav>
  );
}
