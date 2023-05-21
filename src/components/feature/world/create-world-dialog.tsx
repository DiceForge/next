import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModifiableWorld } from "@/api/world/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import WorldForm, { worldShape } from "@/components/feature/world/world-form";
import { createWorld } from "@/api/world/requests";

interface DialogProps {
  children: ReactNode;
}

export default function CreateWorldDialog(props: DialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { register, control, handleSubmit, formState } =
    useForm<ModifiableWorld>({
      defaultValues: {
        name: "",
        description: "",
        visibility: "private",
      },
      resolver: yupResolver(worldShape),
    });

  const onCreateWorld = async (data: ModifiableWorld) => {
    try {
      const res = await createWorld(data);

      toast({
        title: "Success!",
        description: "You have successfully created a new world!",
      });

      router.push(`/world/${res.data.id}/settings`);
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "There was a problem creating your world.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>

      <DialogContent size="large">
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onCreateWorld)}
        >
          <div className="flex flex-col gap-2">
            <DialogTitle>Create World</DialogTitle>
            <DialogDescription>
              Worlds contain your campaigns, NPCs, maps, and other creations.
            </DialogDescription>
          </div>

          <WorldForm
            control={control}
            formState={formState}
            register={register}
          />

          <div className="flex justify-end gap-2">
            <Button
              color="neutral"
              onClick={() => setOpen(false)}
              variant="tonal"
            >
              Cancel
            </Button>

            <Button loading={formState.isSubmitting}>Create World</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
