"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetProps,
  SheetTitle,
} from "@/components/ui/sheet";
import { ManageNPCForm, manageNPCSchema } from "@/components/features/npc";
import { ModifiableNPC } from "@/api/npc/types";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { createNPC } from "@/api/npc/client";
import { useToast } from "@/components/ui/toast";

interface DrawerProps extends SheetProps {
  worldId: number;
}

export default function CreateNPCDrawer(props: DrawerProps) {
  const { worldId, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { register, control, handleSubmit, formState, reset } =
    useForm<ModifiableNPC>({
      defaultValues: {
        name: "",
        backstory: "",
        description: "",
        personality_traits: "",
        ideals: "",
        bonds: "",
        flaws: "",
        physical_description: "",
        equipment: "",
        voice: "",
      },
      resolver: yupResolver(manageNPCSchema),
    });

  const onCreateNPC = async (data: ModifiableNPC) => {
    setLoading(true);

    try {
      await createNPC({
        ...data,
        world_id: worldId,
      });

      toast({
        title: "Success!",
        description: "Your NPC has been created.",
      });

      router.refresh();
      reset();
      props.onOpenChange?.(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "There was a problem creating your NPC.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    reset();
    props.onOpenChange?.(false);
  };

  return (
    <Sheet {...rest}>
      <SheetContent className="flex flex-col">
        <div className="flex flex-1 flex-col p-6 lg:p-10">
          <SheetTitle className="mb-6 lg:mb-10">Create NPC</SheetTitle>

          <form
            className="flex flex-1 flex-col"
            onSubmit={handleSubmit(onCreateNPC)}
          >
            <ManageNPCForm
              control={control}
              formState={formState}
              register={register}
            />

            <div className="flex justify-end gap-2">
              <Button
                color="neutral"
                onClick={onCancel}
                type="button"
                variant="tonal"
              >
                Cancel
              </Button>
              <Button loading={loading}>
                <Icon name="UserPlus" />
                Create NPC
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
