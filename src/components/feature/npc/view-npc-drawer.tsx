import ReactMarkdown from "react-markdown";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetProps,
  SheetTitle,
} from "@/components/ui/sheet";
import { NPC } from "@/api/npc/types";
import { Badge } from "@/components/ui/badge";
import { alignmentDetails, npcTypeDetails } from "@/lib";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DrawerProps extends SheetProps {
  npc: NPC;
  onEditNPC: (npc: NPC) => void;
}

export default function ViewNPCDrawer(props: DrawerProps) {
  const { npc, onEditNPC, ...rest } = props;

  return (
    <Sheet {...rest}>
      <SheetContent className="flex flex-col">
        <div className="flex flex-1 flex-col p-6 lg:p-10">
          <div className="mb-6 flex flex-col gap-4 lg:mb-10">
            <div className="flex gap-2">
              <Badge color={alignmentDetails[npc.alignment].tagColor}>
                {alignmentDetails[npc.alignment].label}
              </Badge>
              <Badge color={npcTypeDetails[npc.npc_type].tagColor}>
                {npcTypeDetails[npc.npc_type].label}
              </Badge>
            </div>
            <SheetTitle>{npc.name}</SheetTitle>
            <SheetDescription>{npc.purpose}</SheetDescription>
          </div>

          <div className="flex-1">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">
                      Short Description
                    </h6>

                    <ReactMarkdown>
                      {npc.description ||
                        "This NPC has not been given a description."}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">Backstory</h6>

                    <ReactMarkdown>
                      {npc.backstory ||
                        "This NPC has not been given a backstory."}
                    </ReactMarkdown>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="personality">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">
                      Personality Traits
                    </h6>

                    <ReactMarkdown>
                      {npc.personality_traits ||
                        "This NPC has not been given any personality traits."}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">Ideals</h6>

                    <ReactMarkdown>
                      {npc.ideals || "This NPC has not been given any ideals."}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">Bonds</h6>

                    <ReactMarkdown>
                      {npc.bonds || "This NPC has not been given any bonds."}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">Flaws</h6>

                    <ReactMarkdown>
                      {npc.flaws || "This NPC has not been given any flaws."}
                    </ReactMarkdown>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">
                      Physical Description
                    </h6>

                    <ReactMarkdown>
                      {npc.physical_description ||
                        "This NPC has not been given a physical description."}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">Equipment</h6>

                    <ReactMarkdown>
                      {npc.equipment || "This NPC does not have any equipment."}
                    </ReactMarkdown>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h6 className="text-body-semibold-600">Voice</h6>

                    <ReactMarkdown>
                      {npc.voice || "This NPC has not been given a voice."}
                    </ReactMarkdown>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              color="neutral"
              onClick={() => props.onOpenChange?.(false)}
              type="button"
              variant="tonal"
            >
              Close
            </Button>
            <Button onClick={() => onEditNPC(npc)}>
              <Icon name="Edit" />
              Edit NPC
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
