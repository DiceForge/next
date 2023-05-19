import { BASE_URL, buildQueryParams } from "@/api";

import { NPCSearchOptions } from "./types";

export const routes = {
  get: (id: number) => `${BASE_URL}/api/v1/npc/${id}`,
  getAll: (options: NPCSearchOptions) =>
    `${BASE_URL}/api/v1/npc${buildQueryParams(options)}`,
  create: () => `${BASE_URL}/api/v1/npc`,
  update: (id: number) => `${BASE_URL}/api/v1/npc/${id}`,
  delete: (id: number) => `${BASE_URL}/api/v1/npc/${id}`,
  updateIcon: (id: number) => `${BASE_URL}/api/v1/npc/${id}/icon`,
  updatePortrait: (id: number) => `${BASE_URL}/api/v1/npc/${id}/portrait`,
};
