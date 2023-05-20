import { cookies } from "next/headers";

const fetchWithAuth = (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => {
  const headers = new Headers();
  const token = cookies().get("token");

  if (token?.value) {
    headers.set("Authorization", `Token ${token.value}`);
  }

  if (init?.body) {
    headers.set("Content-Type", "application/json");
  }

  return new Promise(async (resolve, reject) => {
    const res = await fetch(input, {
      ...init,
      headers,
    });

    if (res.status >= 400) {
      reject(res);
      console.error(res.status, res.statusText, res.url);
    }

    resolve(res);
  });
};

export { fetchWithAuth as fetch };
