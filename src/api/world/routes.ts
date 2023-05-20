import { SearchOptions } from "@/api/types";
import { API_URL, buildQueryParams } from "@/api/utils";

import { World } from "./types";

export const routes = {
  get: (id: number) => `${API_URL}/api/v1/world/${id}`,
  getAll: (options: SearchOptions<World>) =>
    `${API_URL}/api/v1/world${buildQueryParams({
      ...options,
      owned_only: "true",
    })}`,
  getPending: (options: SearchOptions<World>) =>
    `${API_URL}/api/v1/world${buildQueryParams({
      ...options,
      pending_only: "true",
    })}`,
  create: () => `${API_URL}/api/v1/world`,
  update: (id: number) => `${API_URL}/api/v1/world/${id}`,
  delete: (id: number) => `${API_URL}/api/v1/world/${id}`,
  invite: (id: number) => `${API_URL}/api/v1/world/${id}/invite`,
  setRole: (id: number) => `${API_URL}/api/v1/world/${id}/set_role`,
  kick: (id: number) => `${API_URL}/api/v1/world/${id}/kick`,
  acceptInvite: (id: number) => `${API_URL}/api/v1/world/${id}/accept_invite`,
  declineInvite: (id: number) => `${API_URL}/api/v1/world/${id}/decline_invite`,
};
