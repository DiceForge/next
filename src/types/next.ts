import { ReactNode } from "react";

export interface PageProps {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export interface LayoutProps {
  params: { [key: string]: string };
  children: ReactNode;
}
