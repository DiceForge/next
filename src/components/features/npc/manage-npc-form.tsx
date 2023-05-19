"use client";

import {
  Control,
  Controller,
  UseFormRegister,
  UseFormStateReturn,
} from "react-hook-form";
import { object, string } from "yup";

import { Alignment, ModifiableNPC, NPCType } from "@/api/npc/types";
import { alignmentDetails, nameRegex, npcTypeDetails } from "@/lib";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { TextArea } from "@/components/ui/textarea";

interface NPCFormProps {
  formState: UseFormStateReturn<ModifiableNPC>;
  register: UseFormRegister<ModifiableNPC>;
  control: Control<ModifiableNPC>;
}

export const manageNPCSchema = object()
  .shape({
    name: string()
      .required("Name is required")
      .matches(nameRegex, "No special characters are allowed."),
    npc_type: string<NPCType>().required("NPC Type is required"),
    purpose: string().required("Purpose is required"),
    alignment: string<Alignment>().required("Alignment is required"),
    backstory: string(),
    description: string(),
    personality_traits: string(),
    ideals: string(),
    bonds: string(),
    flaws: string(),
    physical_description: string(),
    equipment: string(),
    voice: string(),
  })
  .required();

export default function ManageNPCForm(props: NPCFormProps) {
  const { formState, control, register } = props;

  const generalExclam = [
    formState.errors.name,
    formState.errors.npc_type,
    formState.errors.alignment,
    formState.errors.purpose,
    formState.errors.description,
    formState.errors.backstory,
  ].some((error) => error !== undefined);

  const personalityExclam = [
    formState.errors.personality_traits,
    formState.errors.ideals,
    formState.errors.bonds,
    formState.errors.flaws,
  ].some((error) => error !== undefined);

  const appearanceExclam = [
    formState.errors.physical_description,
    formState.errors.equipment,
    formState.errors.voice,
  ].some((error) => error !== undefined);

  return (
    <div className="mb-4 flex-1">
      <Tabs>
        <TabsList defaultValue="general">
          <TabsTrigger value="general">
            {generalExclam && <Icon name="AlertCircle" />}
            General
          </TabsTrigger>
          <TabsTrigger value="personality">
            {personalityExclam && <Icon name="AlertCircle" />}
            Personality
          </TabsTrigger>
          <TabsTrigger value="appearance">
            {appearanceExclam && <Icon name="AlertCircle" />}
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 lg:flex-row">
              <Input
                className="flex-1"
                errorText={formState.errors.name?.message}
                helpText="The name of your NPC."
                label="NPC Name"
                placeholder="Strahd von Zarowich"
                status={formState.errors.name ? "error" : "default"}
                {...register("name")}
              />

              <Controller
                control={control}
                name="npc_type"
                render={({ field }) => (
                  <Select
                    className="flex-1"
                    errorText={formState.errors.npc_type?.message}
                    helpText="Explanations of the NPC Types can be found in the Help Center."
                    label="NPC Type"
                    onValueChange={field.onChange}
                    placeholder="Foil"
                    status={formState.errors.npc_type ? "error" : "default"}
                    {...field}
                  >
                    {Object.entries(npcTypeDetails).map(([value, data]) => (
                      <SelectItem
                        description={data.description}
                        key={value}
                        value={value}
                      >
                        {data.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <Input
                className="flex-1"
                errorText={formState.errors.purpose?.message}
                helpText="What is your NPC's overarching goal?"
                label="Purpose"
                placeholder="To kill the players and kidnap Ireena."
                status={formState.errors.purpose ? "error" : "default"}
                {...register("purpose")}
              />

              <Controller
                control={control}
                name="alignment"
                render={({ field }) => (
                  <Select
                    className="flex-1"
                    errorText={formState.errors.alignment?.message}
                    helpText="Alignment helps determine your NPC's moral compass."
                    label="Alignment"
                    onValueChange={field.onChange}
                    placeholder="Lawful Evil"
                    status={formState.errors.alignment ? "error" : "default"}
                    {...field}
                  >
                    {Object.entries(alignmentDetails).map(([value, data]) => (
                      <SelectItem
                        description={data.description}
                        key={value}
                        value={value}
                      >
                        {data.label}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </div>

            <TextArea
              errorText={formState.errors.description?.message}
              helpText="A quick summary of your NPC. Give an overview of their purpose and their goal."
              label="Short Description"
              rows={6}
              status={formState.errors.description ? "error" : "default"}
              {...register("description")}
            />

            <TextArea
              errorText={formState.errors.backstory?.message}
              helpText="A brief description of your NPC's past. What events led them to where they are now?"
              label="Backstory"
              rows={6}
              status={formState.errors.backstory ? "error" : "default"}
              {...register("backstory")}
            />
          </div>
        </TabsContent>

        <TabsContent value="personality">
          <div className="flex flex-col gap-5">
            <TextArea
              errorText={formState.errors.personality_traits?.message}
              helpText="A prominent NPC should have at least two personality traits. A less important NPC should have one."
              label="Personality Traits"
              rows={6}
              status={formState.errors.personality_traits ? "error" : "default"}
              {...register("personality_traits")}
            />

            <TextArea
              errorText={formState.errors.ideals?.message}
              helpText="What inspires your NPC? What are they hoping to achieve or obtain? Ex: Power, Harmony, Progress, Wealth."
              label="Ideals"
              rows={4}
              status={formState.errors.ideals ? "error" : "default"}
              {...register("ideals")}
            />

            <TextArea
              errorText={formState.errors.bonds?.message}
              helpText="What does your NPC hold dear? What do they want to protect? Ex: Their patron god, their brother, their king."
              label="Bonds"
              rows={4}
              status={formState.errors.bonds ? "error" : "default"}
              {...register("bonds")}
            />

            <TextArea
              errorText={formState.errors.flaws?.message}
              helpText="What is your NPC bad at? What prevents them from achieving their goals? Ex: Arrogance, cowardice, greed."
              label="Flaws"
              rows={4}
              status={formState.errors.flaws ? "error" : "default"}
              {...register("flaws")}
            />
          </div>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="flex flex-col gap-5">
            <TextArea
              errorText={formState.errors.physical_description?.message}
              helpText="What does your NPC look like? What do they smell like? Do they have any distinguishing features?"
              label="Physical Description"
              rows={6}
              status={
                formState.errors.physical_description ? "error" : "default"
              }
              {...register("physical_description")}
            />

            <TextArea
              errorText={formState.errors.equipment?.message}
              helpText="What does your NPC carry with them? What do they use to fight with? What do they wear?"
              label="Equipment"
              rows={6}
              status={formState.errors.equipment ? "error" : "default"}
              {...register("equipment")}
            />

            <TextArea
              errorText={formState.errors.voice?.message}
              helpText="When your NPC speaks, what do they sound like? Are they nasally and high pitched? Deep and brooding?"
              label="Voice"
              rows={6}
              status={formState.errors.voice ? "error" : "default"}
              {...register("voice")}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
