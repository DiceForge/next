import { cookies } from "next/headers";

import { NPC, NPCSearchOptions } from "@/api/npc/types";
import { routes } from "@/api/npc/routes";

export async function getNPC(id: number): Promise<NPC> {
  const npc = await fetch(routes.get(id), {
    cache: "no-store",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });

  return npc.json();
}

export async function getNPCs(options: NPCSearchOptions): Promise<NPC[]> {
  const npcs = await fetch(routes.getAll(options), {
    cache: "no-store",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });

  return npcs.json();
}
