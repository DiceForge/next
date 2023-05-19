import { Metadata } from "next";
import { redirect } from "next/navigation";

import { PageProps } from "@/types/next";
import { getWorld } from "@/api/world/server";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUser } from "@/api/user/server";
import { ModifyUsersTable, ModifyWorldForm } from "@/components/features/world";

export const metadata: Metadata = {
  title: "DiceForge - World Settings",
};

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
          <ModifyWorldForm user={user} world={world} />
        </TabsContent>

        <TabsContent value="users">
          <ModifyUsersTable user={user} world={world} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
