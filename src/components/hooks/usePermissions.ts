import { useMemo } from "react";

import { User } from "@/api/user/types";
import { World } from "@/api/world/types";

export enum Permission {
  CAN_VIEW_WORLD,
  CAN_EDIT_WORLD,
  CAN_DELETE_WORLD,
  CAN_MANAGE_ROLES,
  CAN_PUBLISH_WORLD,
}

export type Permissions = {
  [key in Permission]: boolean;
};

export default function usePermissions(
  user?: User | null,
  world?: World | null
): Permissions {
  const canViewWorld: boolean = useMemo(() => {
    if (!world) return false;

    if (world.visibility === "public") {
      return true;
    }

    if (!user || !user.username) return false;

    if (user.admin) {
      return true;
    }

    if (world.visibility === "private") {
      return Object.keys(world.roles).includes(user.username);
    }

    return false;
  }, [user, world]);

  const canEditWorld: boolean = useMemo(() => {
    if (!user || !user.username || !world) {
      return false;
    }

    if (user.admin) {
      return true;
    }

    const role = world.roles[user.username];

    return role === "owner" || role === "editor";
  }, [user, world]);

  const canDeleteWorld: boolean = useMemo(() => {
    if (!user || !user.username || !world) {
      return false;
    }

    if (user.admin) {
      return true;
    }

    const role = world.roles[user.username];

    return role === "owner";
  }, [user, world]);

  const canManageRoles: boolean = useMemo(() => {
    if (!user || !user.username || !world) {
      return false;
    }

    if (user.admin) {
      return true;
    }

    const role = world.roles[user.username];

    return role === "owner";
  }, [user, world]);

  const canPublishWorld: boolean = useMemo(() => {
    if (!user || !user.username || !world) {
      return false;
    }

    if (user.admin) {
      return true;
    }

    const role = world.roles[user.username];

    return role === "owner";
  }, [user, world]);

  return {
    [Permission.CAN_VIEW_WORLD]: canViewWorld,
    [Permission.CAN_EDIT_WORLD]: canEditWorld,
    [Permission.CAN_DELETE_WORLD]: canDeleteWorld,
    [Permission.CAN_MANAGE_ROLES]: canManageRoles,
    [Permission.CAN_PUBLISH_WORLD]: canPublishWorld,
  };
}
