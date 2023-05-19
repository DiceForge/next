export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function buildQueryParams<T extends object>(options: T): string {
  const queryParams: string[] = [];

  for (const key in options) {
    if (
      options.hasOwnProperty(key) &&
      options[key as keyof T] !== undefined &&
      options[key as keyof T] !== ""
    ) {
      queryParams.push(
        `${key}=${encodeURIComponent(String(options[key as keyof T]))}`
      );
    }
  }

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
}
