import { cookies } from "next/headers";

import { API_URL } from "@/api";

import { routes } from "./routes";
import { User } from "./types";

/*
  if (user?.avatar_fetchable_id) {
    const isUsingMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
    const baseUrl = isUsingMock
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_API_URL;

    user.avatar_url = `${baseUrl}/api/v1/fetch/${user.avatar_fetchable_id}`;
  }
 */

export async function getUser(): Promise<User | null> {
  const user = await fetch(routes.getUser(), {
    cache: "no-store",
    headers: {
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });

  if (user.status >= 400) {
    return null;
  }

  const userData: User = await user.json();

  if (userData.avatar_fetchable_id) {
    userData.avatar_url = `${API_URL}/api/v1/fetch/${userData.avatar_fetchable_id}`;
  }

  return userData;
}
