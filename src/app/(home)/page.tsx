import { getPendingWorlds, getWorlds } from "@/api/world/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WorldGrid from "@/components/feature/world/world-grid";
import { Badge } from "@/components/ui/badge";
import WorldSearch from "@/components/feature/world/world-search";
import { PageProps } from "@/types/next";

export default async function Page(props: PageProps) {
  const worlds = await getWorlds({
    search: String(props.searchParams?.search ?? ""),
  });
  const pendingInvites = await getPendingWorlds();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mb-4 font-display text-header1">Worlds</h1>

      <Tabs defaultValue="my_worlds">
        <div className="flex gap-4">
          <TabsList>
            <TabsTrigger value="my_worlds">My Worlds</TabsTrigger>
            <TabsTrigger value="pending_invites">
              Pending Invites
              <Badge>{pendingInvites.length} Invites</Badge>
            </TabsTrigger>
          </TabsList>

          <WorldSearch />
        </div>

        <TabsContent value="my_worlds">
          <WorldGrid worlds={worlds} />
        </TabsContent>

        <TabsContent value="pending_invites">
          <WorldGrid worlds={pendingInvites} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
