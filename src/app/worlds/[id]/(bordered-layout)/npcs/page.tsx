import { redirect } from "next/navigation";

import { getNPCs } from "@/api/npc/server";
import { PageProps } from "@/types/next";
import { NPCTable } from "@/components/features/npc";
import { getWorld } from "@/api/world/server";
import { getUser } from "@/api/user/server";

export default async function Page(props: PageProps) {
  const user = await getUser();
  const npcs = await getNPCs({ world_id: +props.params.id });
  const world = await getWorld(+props.params.id);

  if (!user) {
    redirect("/");
  }

  return (
    <div className="box-border">
      <h1 className="mb-10 text-header4 lg:text-header1">NPCs</h1>

      <NPCTable npcs={npcs} user={user} world={world} />
    </div>
  );
}
