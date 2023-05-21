"use client";

import useSWR from "swr";

import apiClient from "@/api/client";

import { routes } from "./routes";
import { AuthResponse, OIDCProvider, OIDCResponse } from "./types";

export const useProviders = () => {
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;
  const { data, error } = useSWR<OIDCResponse>(
    routes.providers(redirectURI ?? "")
  );

  if (!redirectURI) {
    throw new Error("Missing redirect URI");
  }

  return {
    providers: data,
    isLoading: !error && !data,
    error: error,
  };
};

export const login = (code: string, provider: OIDCProvider) => {
  const redirectURI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!redirectURI) {
    throw new Error("Missing redirect URI");
  }

  return apiClient.post<AuthResponse>(routes.login(), {
    code,
    redirect_uri: redirectURI,
    provider,
  });
};

export const finalizeUsername = (username: string) => {
  return apiClient.post<AuthResponse>(routes.setUsername(), {
    username,
  });
};
