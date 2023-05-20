"use client";

import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { ModifiableWorld, World } from "@/api/world/types";
import WorldForm, { worldShape } from "@/components/feature/world/world-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { User } from "@/api/user/types";
import usePermissions, { Permission } from "@/components/hooks/usePermissions";
import { deleteWorld, updateWorld } from "@/api/world/actions";

interface ModifyWorldProps {
  world: World;
  user: User;
}

export default function ModifyWorldTab(props: ModifyWorldProps) {
  const { world, user } = props;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();
  const permissions = usePermissions(user, world);
  const { register, control, handleSubmit, formState, reset } =
    useForm<ModifiableWorld>({
      defaultValues: {
        name: world.name,
        description: world.description,
        visibility: world.visibility,
      },
      resolver: yupResolver(worldShape),
    });

  const onModifyWorld = (data: ModifiableWorld) => {
    startTransition(() => {
      updateWorld(world.id, data)
        .then(() =>
          toast({
            title: "Saved!",
            description: "Your changes have been saved.",
          })
        )
        .catch(() =>
          toast({
            title: "Uh oh!",
            description: "There was a problem saving your changes.",
            variant: "destructive",
          })
        );
    });
  };

  const onDeleteWorld = () => {
    startTransition(() => {
      deleteWorld(world.id)
        .then(() => {
          router.push("/");

          toast({
            title: "Success!",
            description: `You have successfully deleted ${world.name}.`,
          });
        })
        .catch(() =>
          toast({
            title: "Uh oh!",
            description: "There was a problem deleting that world.",
            variant: "destructive",
          })
        );
    });
  };

  const onCancel = () => {
    reset({
      name: world.name,
      description: world.description,
      visibility: world.visibility,
    });
  };

  return (
    <form onSubmit={handleSubmit(onModifyWorld)}>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <WorldForm
            control={control}
            formState={formState}
            register={register}
          />
        </div>

        <div className="flex justify-between gap-2">
          <ConfirmDialog
            dangerous
            description="This will permanently delete your world and all the creations within it. This is irreversible. Are you sure?"
            loading={isPending}
            onConfirm={onDeleteWorld}
            title="Are you sure?"
          >
            <DialogTrigger asChild>
              <Button
                color="danger"
                disabled={!permissions[Permission.CAN_DELETE_WORLD]}
                type="button"
                variant="outlined"
              >
                <TrashIcon size={20} />
                <span className="hidden lg:inline-block">Delete World</span>
              </Button>
            </DialogTrigger>
          </ConfirmDialog>

          <div className="flex flex-1 justify-end gap-2">
            <Button
              color="neutral"
              disabled={!permissions[Permission.CAN_EDIT_WORLD]}
              onClick={onCancel}
              type="button"
              variant="tonal"
            >
              Cancel
            </Button>

            <Button
              disabled={!permissions[Permission.CAN_EDIT_WORLD]}
              loading={isPending}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
