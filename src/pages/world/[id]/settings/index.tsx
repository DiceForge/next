import { useRouter } from "next/router";
import { useEffect } from "react";

import { NextPageWithLayout } from "@/types/next";
import BorderedLayout from "@/components/layout/bordered-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ModifyWorldTab from "@/components/feature/world/modify-world-tab";
import ModifyUsersTab from "@/components/feature/world/modify-users-tab";
import { useWorld } from "@/api/world/requests";
import { useUser } from "@/api/user/requests";
import { useToast } from "@/components/ui/toast";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { world, error } = useWorld(Number(router.query.id));
  const { user } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (error && error.response?.status === 404) {
      toast({
        title: "Uh oh!",
        description: "This world does not exist.",
        variant: "destructive",
      });

      router.push("/");
    }

    if (error && error.response?.status === 403) {
      toast({
        title: "Uh oh!",
        description: "You do not have permission to view this world.",
        variant: "destructive",
      });

      router.push("/");
    }

    if (error && error.response?.status === 401) {
      toast({
        title: "Uh oh!",
        description: "You must be logged in to view this world.",
        variant: "destructive",
      });

      router.push("/");
    }
  }, [router, error, toast]);

  return (
    <div className="box-border max-w-[720px]">
      <h1 className="mb-10 text-header4 lg:text-header1">World Settings</h1>

      {world && user && (
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
      )}
    </div>
  );
};

Page.getLayout = BorderedLayout;

export default Page;
