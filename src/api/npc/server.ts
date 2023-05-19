import { NPC, NPCSearchOptions } from "@/api/npc/types";
import { routes } from "@/api/npc/routes";
import { fetch } from "@/api/fetch";

export async function getNPC(id: number): Promise<NPC> {
  const npc = await fetch(routes.get(id), {
    cache: "no-store",
  });

  return npc.json();
}

export async function getNPCs(options: NPCSearchOptions): Promise<NPC[]> {
  const npcs = await fetch(routes.getAll(options), {
    cache: "no-store",
  });

  return npcs.json();
}
