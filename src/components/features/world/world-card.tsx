"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Card, CardBody, CardExtra, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { World } from "@/api/world/types";
import { ConfirmDialog } from "@/components/common";
import { DialogTrigger } from "@/components/ui/dialog";
import { deleteWorld } from "@/api/world/client";
import { useToast } from "@/components/ui/toast";

interface WorldCardProps {
  world: World;
}

export default function WorldCard(props: WorldCardProps) {
  const { world } = props;
  const router = useRouter();
  const { toast } = useToast();

  const onDeleteWorld = async () => {
    try {
      await deleteWorld(world.id);

      router.refresh();

      toast({
        title: "Success!",
        description: `You have successfully deleted ${world.name}.`,
      });
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "There was a problem deleting that world.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardBody>
        <CardHeader
          subtitle={`${
            world.visibility === "private" ? "Private" : "Public"
          } World`}
          title={world.name}
        />

        <span className="line-clamp-5 flex-1">{world.description}</span>

        <CardExtra className="justify-end gap-2">
          <ConfirmDialog
            dangerous
            description="This will permanently delete your world and all the creations within it. This is irreversible. Are you sure?"
            onConfirm={onDeleteWorld}
            title="Are you sure?"
          >
            <DialogTrigger asChild>
              <Button color="neutral" variant="text">
                Delete
              </Button>
            </DialogTrigger>
          </ConfirmDialog>
          <Link href={`/worlds/${world.id}/settings`}>
            <Button variant="tonal">
              <Icon name="Wrench" />
              Manage
            </Button>
          </Link>
        </CardExtra>
      </CardBody>
    </Card>
  );
}
