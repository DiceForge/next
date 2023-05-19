import { cookies } from "next/headers";

const fetchWithAuth = (input: RequestInfo, init?: RequestInit) => {
  return fetch(input, {
    ...init,
    headers: {
      ...init?.headers,
      Cookie: `token=${cookies().get("token")?.value}`,
    },
  });
};

export { fetchWithAuth as fetch };
