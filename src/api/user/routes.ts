import { API_URL } from "@/api/utils";

export const routes = {
  getUser: () => `${API_URL}/api/v1/user`,
  updateUser: () => `${API_URL}/api/v1/user`,
  uploadAvatar: () => `${API_URL}/api/v1/user/avatar`,
};
