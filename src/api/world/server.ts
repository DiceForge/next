import { SearchOptions } from "@/api/types";
import { fetch } from "@/api/fetch";

import { World } from "./types";
import { routes } from "./routes";

export async function getWorld(id: number): Promise<World> {
  const world = await fetch(routes.get(id), {
    cache: "no-store",
  });

  return world.json();
}

export async function getWorlds(
  options: SearchOptions<World> = {}
): Promise<World[]> {
  const worlds = await fetch(routes.getAll(options), {
    cache: "no-store",
  });

  return worlds.json();
}

export async function getPendingWorlds(
  options: SearchOptions<World> = {}
): Promise<World[]> {
  const worlds = await fetch(routes.getPending(options), {
    cache: "no-store",
  });

  return worlds.json();
}
