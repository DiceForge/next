"use client";

import Link from "next/link";
import { useTransition } from "react";

import { Card, CardBody, CardExtra, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { World } from "@/api/world/types";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { deleteWorld } from "@/api/world/actions";
import { useToast } from "@/components/ui/toast";

interface WorldCardProps {
  world: World;
}

export default function WorldCard(props: WorldCardProps) {
  const { world } = props;
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onDeleteWorld = () => {
    startTransition(() => {
      deleteWorld(world.id)
        .then(() =>
          toast({
            title: "Success!",
            description: `You have successfully deleted ${world.name}.`,
          })
        )
        .catch(() =>
          toast({
            title: "Uh oh!",
            description: "There was a problem deleting that world.",
            variant: "destructive",
          })
        );
    });
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
            loading={isPending}
            onConfirm={onDeleteWorld}
            title="Are you sure?"
          >
            <DialogTrigger asChild>
              <Button color="neutral" variant="text">
                Delete
              </Button>
            </DialogTrigger>
          </ConfirmDialog>
          <Link href={`/world/${world.id}/settings`}>
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
