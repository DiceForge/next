import { BASE_URL, buildQueryParams } from "../";

export const routes = {
  providers: (redirectURI: string) =>
    `${BASE_URL}/api/v1/auth/oidc${buildQueryParams({
      redirect_uri: redirectURI,
    })}`,
  // Next.js API route handler
  loginClient: () => `${BASE_URL}/api/internal/login`,

  // Server route handler
  login: () => `${BASE_URL}/api/v1/auth/login`,
  setUsername: () => `${BASE_URL}/api/v1/auth/set_username`,
};
