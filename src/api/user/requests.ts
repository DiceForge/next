"use client";

import useSWR from "swr";

import apiClient from "@/api/client";
import fetcher from "@/api/fetcher";

import { routes } from "./routes";
import { User } from "./types";

export const useUser = () => {
  const token = (() => {
    if (typeof window === "undefined") return null;

    return localStorage.getItem("token");
  })();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User | null>(token ? routes.getUser() : null, fetcher);

  if (user?.avatar_fetchable_id) {
    const isUsingMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
    const baseUrl = isUsingMock
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_API_URL;

    user.avatar_url = `${baseUrl}/api/v1/fetch/${user.avatar_fetchable_id}`;
  }

  return {
    user: token ? user : null,
    isSignedIn: Boolean(token),
    needs_username: user && !user.username,
    mutateUser: mutate,
    error: error,
  };
};

export const uploadUserAvatar = (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);

  return apiClient.post(routes.uploadAvatar(), formData);
};
