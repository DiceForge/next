"use client";

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
import { createWorld } from "@/api/world/client";
import { ModifiableWorld } from "@/api/world/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import WorldForm, { worldShape } from "@/components/features/world/world-form";

interface DialogProps {
  children: ReactNode;
}

export default function CreateWorldDialog(props: DialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
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
    setLoading(true);

    try {
      const res = await createWorld(data);

      router.push(`/worlds/${res.data.id}/settings`);
    } catch (e) {
      toast({
        title: "Uh oh!",
        description: "There was a problem creating your world.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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

            <Button loading={loading}>Create World</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
