import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModifyWorldTab from "@/components/feature/world/modify-world-tab";
import { getWorld } from "@/api/world/actions";
import { PageProps } from "@/types/next";
import { getUser } from "@/api/user/actions";
import ModifyUsersTab from "@/components/feature/world/modify-users.tab";

export default async function Page(props: PageProps) {
  const world = await getWorld(+props.params.id);
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="box-border max-w-[720px]">
      <h1 className="mb-10 text-header4 lg:text-header1">World Settings</h1>

      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <ModifyWorldTab user={user} world={world} />
        </TabsContent>

        <TabsContent value="users">
          <ModifyUsersTab user={user} world={world} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
