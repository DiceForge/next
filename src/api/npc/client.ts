import axios from "axios";

import { routes } from "./routes";
import { ModifiableNPC, NPC } from "./types";

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
