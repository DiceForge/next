"use server";

import { OIDCResponse } from "@/api/auth/types";
import { fetch } from "@/api/fetch";
import { routes } from "@/api/auth/routes";

export async function getProviders(): Promise<OIDCResponse> {
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  if (!REDIRECT_URI) {
    throw new Error("Missing Redirect URI environment variable!");
  }

  const response = await fetch(routes.providers(REDIRECT_URI));

  return response.json();
}
