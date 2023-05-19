import axios from "axios";

import { routes } from "@/api/user/routes";

export const uploadUserAvatar = (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return axios.post(routes.uploadAvatar(), formData);
};
