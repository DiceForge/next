import useSWR from "swr";
import axios from "axios";

import { routes } from "./routes";
import { ModifiableNPC, NPC, NPCSearchOptions } from "./types";

export function useNPC(id: number) {
  const { data: npc, error, mutate } = useSWR<NPC, Error>(routes.get(id));

  return {
    npc,
    isLoading: !error && !npc,
    error: error,
    mutateNpc: mutate,
  };
}

export function useNPCs(options: NPCSearchOptions) {
  const {
    data: npcList,
    error,
    mutate,
  } = useSWR<NPC[], Error>(options.world_id ? routes.getAll(options) : null);

  return {
    npcList,
    isLoading: !error && !npcList,
    error: error,
    mutateNpcs: mutate,
  };
}

export function createNPC(data: ModifiableNPC & { world_id: number }) {
  return axios.post<NPC>(routes.create(), data);
}

export function updateNPC(id: number, data: Partial<ModifiableNPC>) {
  return axios.patch<NPC>(routes.update(id), data);
}

export function deleteNPC(id: number) {
  return axios.delete<NPC>(routes.delete(id));
}

export function updateNPCIcon(id: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post<NPC>(routes.updateIcon(id), formData);
}

export function updateNPCPortrait(id: number, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post<NPC>(routes.updatePortrait(id), formData);
}
