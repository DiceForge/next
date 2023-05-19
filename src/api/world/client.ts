import axios from "axios";

import {
  InviteUserRequest,
  KickUserRequest,
  ModifiableWorld,
  SetRoleRequest,
  World,
} from "@/api/world/types";
import { routes } from "@/api/world/routes";

export function createWorld(data: ModifiableWorld) {
  return axios.post<World>(routes.create(), data);
}

export function updateWorld(id: number, data: Partial<ModifiableWorld>) {
  return axios.patch<World>(routes.update(id), data);
}

export function deleteWorld(id: number) {
  return axios.delete<World>(routes.delete(id));
}

export function inviteUser(id: number, data: InviteUserRequest) {
  return axios.post(routes.invite(id), data);
}

export function setRole(id: number, data: SetRoleRequest) {
  return axios.post(routes.setRole(id), data);
}

export function kickUser(id: number, data: KickUserRequest) {
  return axios.post(routes.kick(id), data);
}

export function acceptInvite(id: number) {
  return axios.post(routes.acceptInvite(id));
}

export function declineInvite(id: number) {
  return axios.post(routes.declineInvite(id));
}
