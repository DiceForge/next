"use client";

import { ReactNode, useState, useTransition } from "react";
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
import { createWorld } from "@/api/world/actions";
import { ModifiableWorld } from "@/api/world/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import WorldForm, { worldShape } from "@/components/feature/world/world-form";

interface DialogProps {
  children: ReactNode;
}

export default function CreateWorldDialog(props: DialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
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

  const onCreateWorld = (data: ModifiableWorld) => {
    startTransition(() => {
      createWorld(data)
        .then((res) => {
          router.push(`/world/${res.id}/settings`);

          toast({
            title: "Success!",
            description: "You have successfully created a new world!",
          });
        })
        .catch(() =>
          toast({
            title: "Uh oh!",
            description: "There was a problem creating your world.",
            variant: "destructive",
          })
        );
    });
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

            <Button loading={isPending}>Create World</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
