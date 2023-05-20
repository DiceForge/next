"use server";

import { revalidatePath } from "next/cache";

import { SearchOptions } from "@/api/types";
import {
  InviteUserRequest,
  KickUserRequest,
  ModifiableWorld,
  SetRoleRequest,
  World,
} from "@/api/world/types";
import { fetch } from "@/api/fetch";
import { routes } from "@/api/world/routes";

export async function getWorlds(
  options: SearchOptions<World> = {}
): Promise<World[]> {
  const res = await fetch(routes.getAll(options), {
    cache: "no-store",
  });

  return res.json();
}

export async function getPendingWorlds(
  options: SearchOptions<World> = {}
): Promise<World[]> {
  const res = await fetch(routes.getPending(options), {
    cache: "no-store",
  });

  return res.json();
}

export async function getWorld(id: number): Promise<World> {
  const res = await fetch(routes.get(id), {
    cache: "no-store",
  });

  return res.json();
}

export async function createWorld(data: ModifiableWorld): Promise<World> {
  const res = await fetch(routes.create(), {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath(routes.getAll({}));

  return res.json();
}

export async function updateWorld(id: number, data: Partial<ModifiableWorld>) {
  await fetch(routes.update(id), {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  revalidatePath(routes.get(id));
}

export async function deleteWorld(id: number) {
  await fetch(routes.delete(id), {
    method: "DELETE",
  });

  revalidatePath(routes.getAll({}));
}

export async function inviteUser(id: number, data: InviteUserRequest) {
  await fetch(routes.invite(id), {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath(routes.get(id));
}

export async function setRole(id: number, data: SetRoleRequest) {
  await fetch(routes.invite(id), {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath(routes.get(id));
}

export async function kickUser(id: number, data: KickUserRequest) {
  await fetch(routes.invite(id), {
    method: "POST",
    body: JSON.stringify(data),
  });

  revalidatePath(routes.get(id));
}

export async function acceptInvite(id: number) {
  await fetch(routes.acceptInvite(id), {
    method: "POST",
  });

  revalidatePath(routes.getAll({}));
}

export async function declineInvite(id: number) {
  await fetch(routes.declineInvite(id), {
    method: "POST",
  });

  revalidatePath(routes.getAll({}));
}
