"use client";

import { useRouter } from "next/navigation";

import { World } from "@/api/world/types";
import {
  Tabs,
  TabsContent,
  TabsExtra,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { CreateWorldDialog, WorldGrid } from "@/components/features/world";
import { buildQueryParams } from "@/api";

interface Props {
  worlds: World[];
  invites: World[];
}

export default function WorldList(props: Props) {
  const { worlds, invites } = props;
  const router = useRouter();

  const onSearch = (search: string) => {
    router.replace(`/${buildQueryParams({ search })}`);
  };

  return (
    <Tabs defaultValue="worlds">
      <div className="flex flex-col items-start gap-4 lg:flex-row">
        <TabsList>
          <TabsTrigger value="worlds">My Worlds</TabsTrigger>
          <TabsTrigger value="pending">
            Pending Invites ({props.invites.length})
          </TabsTrigger>
        </TabsList>

        <TabsExtra>
          <Input
            className="max-w-[280px]"
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
          />

          <CreateWorldDialog>
            <Button>
              <Icon name="Plus" />
              <span className="hidden lg:inline-block">Create World</span>
            </Button>
          </CreateWorldDialog>
        </TabsExtra>
      </div>

      <TabsContent value="worlds">
        <WorldGrid worlds={worlds} />
      </TabsContent>

      <TabsContent value="pending">
        <WorldGrid worlds={invites} />
      </TabsContent>
    </Tabs>
  );
}
