import { API_URL, buildQueryParams } from "@/api/utils";

export const routes = {
  providers: (redirectURI: string) =>
    `${API_URL}/api/v1/auth/oidc${buildQueryParams({
      redirect_uri: redirectURI,
    })}`,
  login: () => `${API_URL}/api/v1/auth/login`,
  setUsername: () => `${API_URL}/api/v1/auth/set_username`,
};
