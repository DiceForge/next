import { BASE_URL, buildQueryParams } from "@/api/utils";
import { SearchOptions } from "@/api/types";

import { World } from "./types";

export const routes = {
  get: (id: number) => `${BASE_URL}/api/v1/world/${id}`,
  getAll: (options: SearchOptions<World>) =>
    `${BASE_URL}/api/v1/world${buildQueryParams({
      ...options,
      owned_only: "true",
    })}`,
  getPending: (options: SearchOptions<World>) =>
    `${BASE_URL}/api/v1/world${buildQueryParams({
      ...options,
      pending_only: "true",
    })}`,
  create: () => `${BASE_URL}/api/v1/world`,
  update: (id: number) => `${BASE_URL}/api/v1/world/${id}`,
  delete: (id: number) => `${BASE_URL}/api/v1/world/${id}`,
  invite: (id: number) => `${BASE_URL}/api/v1/world/${id}/invite`,
  setRole: (id: number) => `${BASE_URL}/api/v1/world/${id}/set_role`,
  kick: (id: number) => `${BASE_URL}/api/v1/world/${id}/kick`,
  acceptInvite: (id: number) => `${BASE_URL}/api/v1/world/${id}/accept_invite`,
  declineInvite: (id: number) =>
    `${BASE_URL}/api/v1/world/${id}/decline_invite`,
};
