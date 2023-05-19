"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Alignment, NPC, NPCType } from "@/api/npc/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import usePermissions, { Permission } from "@/components/hooks/usePermissions";
import { World } from "@/api/world/types";
import { User } from "@/api/user/types";
import {
  CreateNPCDrawer,
  EditNPCDrawer,
  ViewNPCDrawer,
} from "@/components/features/npc";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { alignmentDetails, npcTypeDetails } from "@/lib";
import { DataTable } from "@/components/ui/data-table";
import { ConfirmDialog } from "@/components/common";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DialogTrigger } from "@/components/ui/dialog";
import { deleteNPC } from "@/api/npc/client";
import { useToast } from "@/components/ui/toast";

interface NPCTableProps {
  npcs: NPC[];
  world: World;
  user: User;
}

export default function NPCTable(props: NPCTableProps) {
  const { npcs, world, user } = props;
  const permissions = usePermissions(user, world);
  const { toast } = useToast();
  const router = useRouter();
  const [createOpen, setCreateOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedNPC, setSelectedNPC] = useState<NPC>();

  const onEditNPC = (npc: NPC) => {
    setSelectedNPC(npc);
    setViewOpen(false);
    setEditOpen(true);
  };

  const onViewNPC = (npc: NPC) => {
    setSelectedNPC(npc);
    setViewOpen(true);
  };

  const onDeleteNPC = async (npc: NPC) => {
    try {
      await deleteNPC(npc.id);

      toast({
        title: "Success!",
        description: "Your NPC has been deleted.",
      });

      router.refresh();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Uh oh!",
        description: "There was a problem deleting your NPC.",
      });
    }
  };

  const columns: ColumnDef<NPC>[] = [
    {
      accessorKey: "name",
      header: "NPC Name",
    },
    {
      accessorKey: "npc_type",
      header: "NPC Type",
      cell: (props) => {
        const type = props.getValue() as NPCType;

        return (
          <Badge color={npcTypeDetails[type].tagColor}>
            {npcTypeDetails[type].label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "purpose",
      header: "Purpose",
    },
    {
      accessorKey: "alignment",
      header: "Alignment",
      cell: (props) => {
        const alignment = props.getValue() as Alignment;

        return (
          <Badge color={alignmentDetails[alignment].tagColor}>
            {alignmentDetails[alignment].label}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: (props) => {
        const entry = props.row.original;

        return (
          <div className="flex">
            <ConfirmDialog
              dangerous
              description={`Are you sure you want to delete the NPC ${entry.name}?`}
              onConfirm={() => onDeleteNPC(entry)}
              title="Are you sure?"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    iconButton
                    color="neutral"
                    size="small"
                    variant="text"
                  >
                    <Icon name="MoreHorizontal" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => onViewNPC(entry)}>
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEditNPC(entry)}>
                    Edit
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="text-danger-11">
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
            </ConfirmDialog>
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Input placeholder="Search NPCs..." startIcon="Search" />

        <Button
          disabled={!permissions[Permission.CAN_EDIT_WORLD]}
          onClick={() => setCreateOpen(true)}
        >
          <Icon name="UserPlus" />
          <span className="hidden lg:inline-block">Create NPC</span>
        </Button>
      </div>

      <DataTable columns={columns} data={npcs} />

      <CreateNPCDrawer
        onOpenChange={setCreateOpen}
        open={createOpen}
        worldId={world.id}
      />

      {selectedNPC && (
        <ViewNPCDrawer
          npc={selectedNPC}
          onEditNPC={onEditNPC}
          onOpenChange={setViewOpen}
          open={viewOpen}
        />
      )}

      {selectedNPC && (
        <EditNPCDrawer
          npc={selectedNPC}
          onOpenChange={setEditOpen}
          open={editOpen}
        />
      )}
    </div>
  );
}
