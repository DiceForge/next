import { API_URL, buildQueryParams } from "@/api/utils";

import { NPCSearchOptions } from "./types";

export const routes = {
  get: (id: number) => `${API_URL}/api/v1/npc/${id}`,
  getAll: (options: NPCSearchOptions) =>
    `${API_URL}/api/v1/npc${buildQueryParams(options)}`,
  create: () => `${API_URL}/api/v1/npc`,
  update: (id: number) => `${API_URL}/api/v1/npc/${id}`,
  delete: (id: number) => `${API_URL}/api/v1/npc/${id}`,
  updateIcon: (id: number) => `${API_URL}/api/v1/npc/${id}/icon`,
  updatePortrait: (id: number) => `${API_URL}/api/v1/npc/${id}/portrait`,
};
