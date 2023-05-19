"use server";

import { SearchOptions } from "@/api/types";
import { ModifiableWorld, World } from "@/api/world/types";
import { fetch } from "@/api/fetch";
import { routes } from "@/api/world/routes";

export async function getWorlds(
  options: SearchOptions<World> = {}
): Promise<World[]> {
  const response = await fetch(routes.getAll(options), {
    cache: "no-store",
  });

  return response.json();
}

export async function createWorld(data: ModifiableWorld): Promise<World> {
  const response = await fetch(routes.create(), {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response.json();
}
