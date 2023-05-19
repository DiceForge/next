"use client";

import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { ModifiableWorld, World } from "@/api/world/types";
import { nameRegex } from "@/lib";
import WorldForm from "@/components/features/world/world-form";
import { Button } from "@/components/ui/button";
import { deleteWorld, updateWorld } from "@/api/world/client";
import { useToast } from "@/components/ui/toast";
import { ConfirmDialog } from "@/components/common";
import { DialogTrigger } from "@/components/ui/dialog";
import usePermissions, { Permission } from "@/components/hooks/usePermissions";
import { User } from "@/api/user/types";
import { Icon } from "@/components/ui/icon";

interface Props {
  world: World;
  user: User;
}

const worldShape = object().shape({
  name: string()
    .required("Name is required!")
    .max(45, "Cannot be longer than 45 characters.")
    .matches(nameRegex, "Cannot contain special characters."),
  visibility: string().required("Visibility is required!"),
  description: string().required("World Description is required!"),
});

export default function ModifyWorldForm(props: Props) {
  const { world, user } = props;
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
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
    setLoading(true);

    try {
      await updateWorld(world.id, data);

      router.refresh();

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
    } finally {
      setLoading(false);
    }
  };

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
                <Icon name="Trash" />
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
              loading={loading}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
