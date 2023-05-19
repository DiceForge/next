import { SearchOptions } from "@/api";

export type Alignment =
  | "lawful_good"
  | "neutral_good"
  | "chaotic_good"
  | "lawful_neutral"
  | "true_neutral"
  | "chaotic_neutral"
  | "lawful_evil"
  | "neutral_evil"
  | "chaotic_evil";

export type NPCType =
  | "background"
  | "functional"
  | "proactive"
  | "dynamic"
  | "foil"
  | "epic"
  | "quest_giver";

export interface NPC {
  id: number;
  created_at: number;
  world_id: number;
  organization_id?: number;

  name: string;
  alignment: Alignment;
  npc_type: NPCType;
  purpose: string;
  description: string;
  backstory: string;
  personality_traits: string;
  ideals: string;
  bonds: string;
  flaws: string;
  physical_description: string;
  equipment: string;
  voice: string;

  icon_url?: string;
  portrait_url?: string;
}

export type ModifiableNPC = Omit<
  NPC,
  | "id"
  | "created_at"
  | "world_id"
  | "icon_url"
  | "portrait_url"
  | "organization_id"
>;

export interface NPCSearchOptions extends SearchOptions<NPC> {
  world_id: number;
}
