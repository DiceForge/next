"use client";

import { useEffect, useState } from "react";
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
import { ModifiableNPC, NPC } from "@/api/npc/types";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { updateNPC } from "@/api/npc/client";
import { useToast } from "@/components/ui/toast";

interface DrawerProps extends SheetProps {
  npc: NPC;
}

export default function EditNPCDrawer(props: DrawerProps) {
  const { npc, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { register, control, handleSubmit, formState, reset } =
    useForm<ModifiableNPC>({
      resolver: yupResolver(manageNPCSchema),
    });

  useEffect(() => {
    reset({
      name: npc.name,
      npc_type: npc.npc_type,
      alignment: npc.alignment,
      purpose: npc.purpose,
      description: npc.description,
      backstory: npc.backstory,
      personality_traits: npc.personality_traits,
      ideals: npc.ideals,
      bonds: npc.bonds,
      flaws: npc.flaws,
      physical_description: npc.physical_description,
      equipment: npc.equipment,
      voice: npc.voice,
    });
  }, [reset, npc]);

  const onEditNPC = async (data: ModifiableNPC) => {
    setLoading(true);

    try {
      await updateNPC(npc.id, data);

      toast({
        title: "Success!",
        description: "Your changes have been saved.",
      });

      router.refresh();
      reset();
      props.onOpenChange?.(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "There was a problem updating your NPC.",
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
          <SheetTitle className="mb-6 lg:mb-10">Update NPC</SheetTitle>

          <form
            className="flex flex-1 flex-col"
            onSubmit={handleSubmit(onEditNPC)}
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
                <Icon name="Save" />
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
