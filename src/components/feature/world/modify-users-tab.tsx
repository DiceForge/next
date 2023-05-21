import { World } from "@/api/world/types";
import { User } from "@/api/user/types";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import usePermissions, { Permission } from "@/components/hooks/usePermissions";
import InviteUserDialog from "@/components/feature/world/invite-user-dialog";
import ModifyUsersTable from "@/components/feature/world/modify-users-table";

interface ModifyUsersProps {
  world: World;
  user: User;
}

export default function ModifyUsersTab(props: ModifyUsersProps) {
  const { world, user } = props;
  const permissions = usePermissions(user, world);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4">
        <Input placeholder="Search users..." startIcon="Search" />

        <InviteUserDialog world={world}>
          <Button disabled={!permissions[Permission.CAN_MANAGE_ROLES]}>
            <Icon name="UserPlus" />
            <span className="hidden lg:inline-block">Invite User</span>
          </Button>
        </InviteUserDialog>
      </div>

      <ModifyUsersTable user={user} world={world} />
    </div>
  );
}
