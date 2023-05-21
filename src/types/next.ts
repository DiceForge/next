import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type PageLayout = (page: ReactElement) => ReactNode;

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: PageLayout;
};
