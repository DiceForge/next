import Link from "next/link";
import { useRouter } from "next/router";

import { Card, CardBody, CardExtra, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { World } from "@/api/world/types";
import { useToast } from "@/components/ui/toast";
import {
  acceptInvite,
  declineInvite,
  usePendingWorlds,
  useWorlds,
} from "@/api/world/requests";

interface WorldCardProps {
  world: World;
  mode: "manage" | "invite";
}

export default function WorldCard(props: WorldCardProps) {
  const { world, mode } = props;
  const router = useRouter();
  const { mutateWorlds } = useWorlds();
  const { mutatePendingWorlds } = usePendingWorlds();
  const { toast } = useToast();

  const onAcceptInvite = async () => {
    try {
      await acceptInvite(world.id);
      await mutateWorlds();
      await mutatePendingWorlds();

      router.push(`/world/${world.id}/settings`);

      toast({
        title: "Success!",
        description: `You have successfully accepted the invitation to join ${world.name}.`,
      });
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "There was an issue accepting the invitation.",
        variant: "destructive",
      });
    }
  };

  const onDeclineInvite = async () => {
    try {
      await declineInvite(world.id);
      await mutateWorlds();
      await mutatePendingWorlds();

      toast({
        title: "Success!",
        description: `You have successfully declined the invitation to join ${world.name}.`,
      });
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "There was an issue declining the invitation.",
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

        {mode === "manage" && (
          <CardExtra className="justify-end gap-2">
            <Link href={`/world/${world.id}/settings`}>
              <Button variant="tonal">
                <Icon name="Wrench" />
                Manage
              </Button>
            </Link>
          </CardExtra>
        )}

        {mode === "invite" && (
          <CardExtra className="justify-end gap-2">
            <Button color="neutral" onClick={onDeclineInvite} variant="text">
              Decline
            </Button>
            <Button onClick={onAcceptInvite} variant="tonal">
              <Icon name="Check" />
              Accept Invite
            </Button>
          </CardExtra>
        )}
      </CardBody>
    </Card>
  );
}
