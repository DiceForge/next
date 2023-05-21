import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { usernameRegex, worldPermissionDetails } from "@/lib";
import { InviteUserRequest, World } from "@/api/world/types";
import { inviteUser, useWorld } from "@/api/world/requests";
import { useToast } from "@/components/ui/toast";
import { Icon } from "@/components/ui/icon";

interface InviteUserProps {
  world: World;
  children: ReactNode;
}

const inviteShape = object().shape({
  username: string()
    .required("Username is required!")
    .matches(usernameRegex, "Must be a valid username!"),
  role: string().required("Role is required!"),
});

export default function InviteUserDialog(props: InviteUserProps) {
  const { children, world } = props;
  const { mutateWorld } = useWorld(world.id);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { control, register, formState, handleSubmit, reset } =
    useForm<InviteUserRequest>({
      defaultValues: {
        username: "",
        role: "viewer",
      },
      resolver: yupResolver(inviteShape),
    });

  const onInviteUser = async (data: InviteUserRequest) => {
    try {
      await inviteUser(world.id, data);

      mutateWorld();
      reset();

      toast({
        title: "Success!",
        description: `You have successfully invited ${data.username} to your world.`,
      });

      setOpen(false);
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: `There was a problem inviting ${data.username} to your world.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>Invite User</DialogTitle>
        <DialogDescription>Invite a user to your world.</DialogDescription>

        <form onSubmit={handleSubmit(onInviteUser)}>
          <div className="flex flex-col gap-4">
            <Input
              errorText={formState.errors.username?.message}
              label="Username"
              placeholder="strahd.zarowich"
              status={formState.errors.username ? "error" : "default"}
              {...register("username")}
            />

            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <Select
                  errorText={formState.errors.role?.message}
                  label="Role"
                  onValueChange={field.onChange}
                  placeholder="Role"
                  status={formState.errors.role ? "error" : "default"}
                  {...field}
                >
                  {Object.entries(worldPermissionDetails)
                    .filter(([key]) => key !== "pending")
                    .map(([key, value]) => (
                      <SelectItem description={value.description} value={key}>
                        {value.label}
                      </SelectItem>
                    ))}
                </Select>
              )}
            />

            <div className="flex justify-end gap-2">
              <Button
                color="neutral"
                onClick={() => setOpen(false)}
                type="button"
                variant="tonal"
              >
                Cancel
              </Button>

              <Button loading={formState.isSubmitting}>
                <Icon name="UserPlus" />
                Invite User
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
