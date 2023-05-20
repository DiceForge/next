import { API_URL } from "@/api/utils";
import { fetch } from "@/api/fetch";

import { routes } from "./routes";
import { User } from "./types";

export async function getUser(): Promise<User | null> {
  const user = await fetch(routes.getUser(), {
    cache: "no-store",
  });

  if (user.status >= 400) {
    return null;
  }

  const userData = await user.json();

  if (userData.avatar_fetchable_id) {
    userData.avatar_url = `${API_URL}/api/v1/fetch/${userData.avatar_fetchable_id}`;
  }

  return userData;
}
