import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";

import { ModifiableWorld, World } from "@/api/world/types";
import WorldForm, { worldShape } from "@/components/feature/world/world-form";
import { ConfirmDialog } from "@/components/common/confirm-dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import usePermissions, { Permission } from "@/components/hooks/usePermissions";
import { useWorld, deleteWorld, updateWorld } from "@/api/world/requests";
import { User } from "@/api/user/types";
import { Badge } from "@/components/ui/badge";

interface ModifyWorldProps {
  world: World;
  user: User;
}

export default function ModifyWorldTab(props: ModifyWorldProps) {
  const { world, user } = props;
  const router = useRouter();
  const { mutateWorld } = useWorld(world.id);
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

  const onModifyWorld = async (data: ModifiableWorld) => {
    try {
      const res = await updateWorld(world.id, data);

      await mutateWorld(res.data);

      toast({
        title: "Saved!",
        description: "Your changes have been saved.",
      });
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "There was a problem saving your changes.",
        variant: "destructive",
      });
    }
  };

  const onDeleteWorld = async () => {
    try {
      await deleteWorld(world.id);

      toast({
        title: "Success!",
        description: `You have successfully deleted ${world.name}.`,
      });

      router.push("/");
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "There was a problem deleting that world.",
        variant: "destructive",
      });
    }
  };

  const onCancel = () => {
    reset({
      name: world.name,
      description: world.description,
      visibility: world.visibility,
    });
  };

  if (!permissions[Permission.CAN_EDIT_WORLD]) {
    return (
      <div className="flex flex-col">
        <div>
          {world.visibility === "public" && <Badge>Public</Badge>}
          {world.visibility === "private" && (
            <Badge color="neutral">Private</Badge>
          )}
        </div>

        <h2 className="mb-4 font-display text-header2">{world.name}</h2>

        <div className="prose">
          <ReactMarkdown>{world.description}</ReactMarkdown>
        </div>
      </div>
    );
  }

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
            matchTextToDelete={{
              matchText: world.name,
              label: "World Name",
              helpText:
                "Please confirm you want to delete this world by entering its name.",
            }}
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
              loading={formState.isSubmitting}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
