import Link from "next/link";

import { World } from "@/api/world/types";
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
import { Button } from "@/components/ui/button";

interface WorldSwitcherProps {
  currentWorld?: World;
  worldList?: World[];
}

export default function WorldSwitcher(props: WorldSwitcherProps) {
  const { currentWorld, worldList } = props;

  return (
    <div className="flex items-center gap-2 group-[.collapsed]:flex-col-reverse">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Icon
          className="min-w-[20px] text-neutral-11 group-[.collapsed]:hidden"
          name="Globe"
          size={20}
        />

        <span className="truncate text-body-semibold-400 group-[.collapsed]:hidden">
          {currentWorld?.name ?? "Loading..."}
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
              {worldList?.map((world) => (
                <Link href={`/worlds/${world.id}/settings`} key={world.id}>
                  <DropdownMenuItem
                    active={world.id === currentWorld?.id}
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
    </div>
  );
}
