import { redirect } from "next/navigation";

import { Navbar } from "@/components/layout/navbar";
import { LayoutProps } from "@/types/next";
import { getUser } from "@/api/user/server";

export default async function Layout(props: LayoutProps) {
  const user = await getUser();

  return (
    <div className="m-6 flex max-w-container flex-col lg:m-10 xl:mx-auto">
      <Navbar user={user} variant="open" />

      {props.children}
    </div>
  );
}
