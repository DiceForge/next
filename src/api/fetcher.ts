import apiClient from "./client";

const fetcher = (url: string) => {
  return apiClient.get(url).then((res) => res.data);
};

export default fetcher;
