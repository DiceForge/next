export type Visibility = "public" | "private";

export type WorldPermission = "owner" | "editor" | "viewer" | "pending";

export type WorldRole = {
  [key: string]: WorldPermission;
};

export type TransformedRole = {
  username: string;
  role: WorldPermission;
};

export interface World {
  id: number;
  name: string;
  description: string;
  visibility: Visibility;
  roles: WorldRole;
  created_at: string;
  updated_at: string;
}

export type ModifiableWorld = Omit<World, "id" | "created_at" | "roles">;

export interface InviteUserRequest {
  username: string;
  role: WorldPermission;
}

export interface SetRoleRequest {
  username: string;
  role: WorldPermission;
}

export interface KickUserRequest {
  username: string;
}
