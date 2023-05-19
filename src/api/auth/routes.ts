import { BASE_URL, buildQueryParams } from "@/api/utils";

export const routes = {
  providers: (redirectURI: string) =>
    `${BASE_URL}/api/v1/auth/oidc${buildQueryParams({
      redirect_uri: redirectURI,
    })}`,
  // Next.js API route handler
  login: () => `${BASE_URL}/api/internal/login`,
  setUsername: () => `${BASE_URL}/api/internal/set_username`,
};
