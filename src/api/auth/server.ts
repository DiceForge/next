import axios from "axios";

import { AuthResponse, OIDCProvider, OIDCResponse } from "@/api/auth/types";

import { routes } from "./routes";

export async function getProviders(): Promise<OIDCResponse> {
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const providers = await fetch(routes.providers(redirectURI ?? ""), {
    cache: "no-store",
  });

  return providers.json();
}

export const login = (code: string, provider: OIDCProvider) => {
  return axios.post<AuthResponse>(routes.loginClient(), {
    code,
    provider,
  });
};

export const finalizeUsername = (username: string) => {
  return axios.post<AuthResponse>(routes.setUsername(), {
    username,
  });
};
