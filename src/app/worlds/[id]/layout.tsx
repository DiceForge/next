import { redirect } from "next/navigation";

import { LayoutProps } from "@/types/next";
import { SideNavigation } from "@/components/layout/side-navigation";
import { getWorld, getWorlds } from "@/api/world/server";
import { Navbar } from "@/components/layout/navbar";
import { getUser } from "@/api/user/server";

export default async function Layout(props: LayoutProps) {
  const [user, world, worldList] = await Promise.all([
    getUser(),
    getWorld(+props.params.id),
    getWorlds(),
  ]);

  if (!user) {
    redirect("/");
  }

  if (!user?.username) {
    redirect("/auth/username");
  }

  return (
    <div className="flex min-h-screen">
      <SideNavigation
        className="hidden xl:flex"
        currentWorld={world}
        worldList={worldList}
      />

      <div className="flex w-full flex-1 flex-col">
        <Navbar
          user={user}
          variant="bordered"
          world={world}
          worldList={worldList}
        />

        <div className="flex-1 p-6 lg:p-10">{props.children}</div>
      </div>
    </div>
  );
}
