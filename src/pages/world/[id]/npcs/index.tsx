import { useRouter } from "next/router";

import { NextPageWithLayout } from "@/types/next";
import BorderedLayout from "@/components/layout/bordered-layout";
import NPCTable from "@/components/feature/npc/npc-table";
import { useUser } from "@/api/user/requests";
import { useWorld } from "@/api/world/requests";
import { useNPCs } from "@/api/npc/requests";
import { LargeSkeleton } from "@/components/ui/skeleton";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { user } = useUser();
  const { world } = useWorld(Number(router.query.id));
  const { npcList } = useNPCs({ world_id: Number(router.query.id) });

  if (!world || !user || !npcList) {
    return <LargeSkeleton />;
  }

  return (
    <div className="box-border">
      <h1 className="mb-10 text-header4 lg:text-header1">NPCs</h1>

      <NPCTable npcs={npcList} user={user} world={world} />
    </div>
  );
};

Page.getLayout = BorderedLayout;

export default Page;
