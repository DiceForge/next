import { ComponentProps } from "react";

import { WorldPermission } from "@/api/world/types";
import { Badge } from "@/components/ui/badge";

export type WorldPermissionDetails = {
  [key in WorldPermission]: {
    label: string;
    description: string;
    tagColor: ComponentProps<typeof Badge>["color"];
  };
};

export const worldPermissionDetails: WorldPermissionDetails = {
  owner: {
    label: "Owner",
    description:
      "Can edit the world and manage roles. Can publish the world to the marketplace.",
    tagColor: "primary",
  },
  editor: {
    label: "Editor",
    description:
      "Can make changes to the world, but cannot manage roles or publish the world to the marketplace",
    tagColor: "accent",
  },
  viewer: {
    label: "Viewer",
    description: "Can view the world.",
    tagColor: "neutral",
  },
  pending: {
    label: "Pending",
    description: "Has been invited to the world, but has not yet accepted.",
    tagColor: "yellow",
  },
};
