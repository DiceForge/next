import { useCallback, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { User } from "@/api/user/types";
import { TransformedRole, World, WorldPermission } from "@/api/world/types";
import usePermissions, { Permission } from "@/components/hooks/usePermissions";
import { useToast } from "@/components/ui/toast";
import { kickUser, setRole, useWorld } from "@/api/world/requests";
import { Badge } from "@/components/ui/badge";
import { worldPermissionDetails } from "@/lib";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/components/ui/icon";
import { DialogTrigger } from "@/components/ui/dialog";
import { DataTable } from "@/components/ui/data-table";

interface ModifyUsersTableProps {
  user: User;
  world: World;
}

export default function ModifyUsersTable(props: ModifyUsersTableProps) {
  const { world, user } = props;
  const { mutateWorld } = useWorld(world.id);
  const permissions = usePermissions(user, world);
  const { toast } = useToast();

  const onChangeRole = useCallback(
    async (username: string, role: WorldPermission) => {
      try {
        await setRole(world.id, { username, role });

        mutateWorld();

        toast({
          title: "Success!",
          description: `${username} has been set to ${role}.`,
        });
      } catch (e) {
        toast({
          title: "Uh oh!",
          description: "Something went wrong while changing this user's role.",
          variant: "destructive",
        });
      }
    },
    [mutateWorld, toast, world]
  );

  const onRemoveUser = useCallback(
    async (username: string) => {
      try {
        await kickUser(world.id, { username });

        mutateWorld();

        toast({
          title: "Success!",
          description: `${username} has been removed from this world.`,
        });
      } catch (e) {
        toast({
          title: "Uh oh!",
          description: "Something went wrong while removing this user.",
          variant: "destructive",
        });
      }
    },
    [mutateWorld, toast, world]
  );

  const columns: ColumnDef<TransformedRole>[] = useMemo(
    () => [
      {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => (
          <div className="flex gap-2">
            {row.getValue("username")}
            {user.username === row.getValue("username") && <Badge>You</Badge>}
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: (props) => {
          const val = props.getValue() as WorldPermission;

          return (
            <Badge color={worldPermissionDetails[val].tagColor}>
              {worldPermissionDetails[val].label}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const entry = row.original;

          const action = () => {
            const canManageRoles = permissions[Permission.CAN_MANAGE_ROLES];
            const isYourself = user.username === entry.username;
            const isPending = entry.role === "pending";

            if (!canManageRoles) {
              return (
                <span className="text-body-medium-200 text-neutral-11">
                  You cannot manage roles
                </span>
              );
            }

            if (isYourself) {
              return (
                <span className="text-body-medium-200 text-neutral-11">
                  You cannot manage yourself
                </span>
              );
            }

            if (isPending) {
              return (
                <div className="flex items-center gap-2">
                  <span className="text-body-medium-200 text-neutral-11">
                    Invite is pending
                  </span>

                  <Button
                    color="danger"
                    onClick={() => onRemoveUser(entry.username)}
                    size="small"
                    variant="text"
                  >
                    Revoke
                  </Button>
                </div>
              );
            }

            return (
              <TableActionMenu
                entry={entry}
                onChangeRole={onChangeRole}
                onRemoveUser={onRemoveUser}
              />
            );
          };

          return (
            <div className="flex items-center justify-end">{action()}</div>
          );
        },
      },
    ],
    [onChangeRole, onRemoveUser, permissions, user]
  );

  const transformedRoles: TransformedRole[] = useMemo(
    () =>
      Object.keys(world.roles).map((username) => ({
        username: username,
        role: world.roles[username],
      })),
    [world.roles]
  );

  return <DataTable columns={columns} data={transformedRoles} />;
}

interface ActionMenuProps {
  onRemoveUser: (username: string) => void;
  onChangeRole: (username: string, role: WorldPermission) => void;
  entry: TransformedRole;
}

function TableActionMenu(props: ActionMenuProps) {
  const { entry, onChangeRole, onRemoveUser } = props;

  return (
    <ConfirmDialog
      dangerous
      description="Are you sure you want to remove this user from your world?"
      onConfirm={() => onRemoveUser(entry.username)}
      title="Are you sure?"
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button iconButton color="neutral" size="small" variant="text">
            <Icon name="MoreHorizontal" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-48">
          <DropdownMenuLabel>Roles</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            {Object.entries(worldPermissionDetails)
              .filter(([key]) => key !== "pending")
              .map(([key, value]) => (
                <DropdownMenuCheckboxItem
                  checked={key === entry.role}
                  key={key}
                  onCheckedChange={() =>
                    onChangeRole(entry.username, key as WorldPermission)
                  }
                >
                  {value.label}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DialogTrigger asChild>
            <DropdownMenuItem dangerous>Remove User</DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    </ConfirmDialog>
  );
}
