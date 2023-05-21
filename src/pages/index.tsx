import { NextPageWithLayout } from "@/types/next";
import OpenLayout from "@/components/layout/open-layout";
import { usePendingWorlds, useWorlds } from "@/api/world/requests";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import WorldSearch from "@/components/feature/world/world-search";
import WorldGrid from "@/components/feature/world/world-grid";
import Loading from "@/components/common/loading";

const Page: NextPageWithLayout = () => {
  const { worldList, isLoading: worldLoading } = useWorlds();
  const { pendingWorldList, isLoading: pendingWorldLoading } =
    usePendingWorlds();

  return (
    <div className="flex flex-col gap-8">
      <h1 className="mb-4 font-display text-header1">Worlds</h1>

      <Tabs defaultValue="my_worlds">
        <div className="flex flex-col gap-4 md:flex-row">
          <TabsList>
            <TabsTrigger value="my_worlds">My Worlds</TabsTrigger>
            <TabsTrigger value="pending_invites">
              Pending Invites
              <Badge>{pendingWorldList?.length} Invites</Badge>
            </TabsTrigger>
          </TabsList>

          <WorldSearch />
        </div>

        <TabsContent value="my_worlds">
          {worldList && <WorldGrid mode="manage" worlds={worldList} />}
          {worldLoading && <Loading />}
        </TabsContent>

        <TabsContent value="pending_invites">
          {pendingWorldList && (
            <WorldGrid mode="invite" worlds={pendingWorldList} />
          )}
          {pendingWorldLoading && <Loading />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

Page.getLayout = OpenLayout;

export default Page;
