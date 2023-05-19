import { BASE_URL } from "@/api/utils";

export const routes = {
  getUser: () => `${BASE_URL}/api/v1/user`,
  updateUser: () => `${BASE_URL}/api/v1/user`,
  uploadAvatar: () => `${BASE_URL}/api/v1/user/avatar`,
};
