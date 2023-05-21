import useSWR from "swr";
import { AxiosError } from "axios";

import apiClient from "@/api/client";
import { SearchOptions } from "@/api/types";

import { routes } from "./routes";
import {
  InviteUserRequest,
  KickUserRequest,
  ModifiableWorld,
  SetRoleRequest,
  World,
} from "./types";

export function useWorld(id?: number) {
  const { data, error, mutate } = useSWR<World, AxiosError>(
    id ? routes.get(id) : null
  );

  return {
    world: data,
    isLoading: !error && !data,
    error: error,
    mutateWorld: mutate,
  };
}

export function useWorlds(options: SearchOptions<World> = {}) {
  const { data, error, mutate } = useSWR<World[], Error>(
    routes.getAll(options)
  );

  return {
    worldList: data,
    isLoading: !error && !data,
    error: error,
    mutateWorlds: mutate,
  };
}

export function usePendingWorlds(options: SearchOptions<World> = {}) {
  const { data, error, mutate } = useSWR<World[], Error>(
    routes.getPending(options)
  );

  return {
    pendingWorldList: data,
    isLoading: !error && !data,
    error: error,
    mutatePendingWorlds: mutate,
  };
}

export function createWorld(data: ModifiableWorld) {
  return apiClient.post<World>(routes.create(), data);
}

export function updateWorld(id: number, data: Partial<ModifiableWorld>) {
  return apiClient.patch<World>(routes.update(id), data);
}

export function deleteWorld(id: number) {
  return apiClient.delete<World>(routes.delete(id));
}

export function inviteUser(id: number, data: InviteUserRequest) {
  return apiClient.post(routes.invite(id), data);
}

export function setRole(id: number, data: SetRoleRequest) {
  return apiClient.post(routes.setRole(id), data);
}

export function kickUser(id: number, data: KickUserRequest) {
  return apiClient.post(routes.kick(id), data);
}

export function acceptInvite(id: number) {
  return apiClient.post(routes.acceptInvite(id));
}

export function declineInvite(id: number) {
  return apiClient.post(routes.declineInvite(id));
}
