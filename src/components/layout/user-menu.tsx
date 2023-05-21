import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/api/user/types";
import { useUser } from "@/api/user/requests";
import { useToast } from "@/components/ui/toast";
import { useWorlds } from "@/api/world/requests";
import UserCard from "@/components/layout/user-card";

interface UserMenuProps {
  user: User;
}

export default function UserMenu(props: UserMenuProps) {
  const { user } = props;
  const { mutateUser } = useUser();
  const { mutateWorlds } = useWorlds();
  const router = useRouter();
  const { toast } = useToast();

  const onSignOut = async () => {
    localStorage.removeItem("token");
    await mutateUser();
    await mutateWorlds();
    router.push("/");

    toast({
      title: "Signed Out!",
      description: "You have been successfully signed out.",
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserCard isMenu user={user} />
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
          <DropdownMenuItem onClick={onSignOut}>Sign Out</DropdownMenuItem>
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
