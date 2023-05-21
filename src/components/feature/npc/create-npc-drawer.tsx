import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  Sheet,
  SheetContent,
  SheetProps,
  SheetTitle,
} from "@/components/ui/sheet";
import ManageNPCForm, {
  manageNPCSchema,
} from "@/components/feature/npc/manage-npc-form";
import { ModifiableNPC } from "@/api/npc/types";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { createNPC, useNPCs } from "@/api/npc/requests";
import { useToast } from "@/components/ui/toast";

interface DrawerProps extends SheetProps {
  worldId: number;
}

export default function CreateNPCDrawer(props: DrawerProps) {
  const { worldId, ...rest } = props;
  const { mutateNpcs } = useNPCs({ world_id: worldId });
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
    try {
      await createNPC({
        ...data,
        world_id: worldId,
      });

      await mutateNpcs();

      toast({
        title: "Success!",
        description: "Your NPC has been created.",
      });

      reset();
      props.onOpenChange?.(false);
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "There was a problem creating your NPC.",
      });
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
              <Button loading={formState.isSubmitting}>
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
