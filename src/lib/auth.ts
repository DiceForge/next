import { type OIDCProvider } from "@/api/auth/types";

export type OIDCDetails = {
  [key in OIDCProvider]: {
    label: string;
    iconURL: string;
  };
};

export const oidcDetails: OIDCDetails = {
  google: {
    label: "Google",
    iconURL: "/icons/google.svg",
  },
};
