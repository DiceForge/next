import { redirect } from "next/navigation";
import { Suspense } from "react";

import { LayoutProps } from "@/types/next";
import { getUser } from "@/api/user/actions";
import { Navbar } from "@/components/ui/navbar";
import SideNavigation from "@/components/layout/side-navigation";
import TopNavigation from "@/components/layout/top-navigation";
import { SideNav, SideNavGroup } from "@/components/ui/sidenav";
import { ContentSkeleton } from "@/components/ui/skeleton";

export default async function Layout(props: LayoutProps) {
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  if (!user?.username) {
    redirect("/auth/username");
  }

  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<LoadingSideNav />}>
        {/* @ts-expect-error Async Server Component */}
        <SideNavigation worldId={+props.params.id} />
      </Suspense>

      <div className="flex w-full flex-1 flex-col">
        <Suspense fallback={<LoadingTopNav />}>
          {/* @ts-expect-error Async Server Component */}
          <TopNavigation variant="bordered" />
        </Suspense>

        <div className="flex-1 p-6 lg:p-10">{props.children}</div>
      </div>
    </div>
  );
}

function LoadingTopNav() {
  return (
    <Navbar variant="bordered">
      <ContentSkeleton />
      <ContentSkeleton />
      <ContentSkeleton />
    </Navbar>
  );
}

function LoadingSideNav() {
  return (
    <SideNav>
      <SideNavGroup>
        <ContentSkeleton />
      </SideNavGroup>

      <SideNavGroup>
        <ContentSkeleton />
        <ContentSkeleton />
        <ContentSkeleton />
        <ContentSkeleton />
      </SideNavGroup>

      <SideNavGroup>
        <ContentSkeleton />
        <ContentSkeleton />
        <ContentSkeleton />
        <ContentSkeleton />
        <ContentSkeleton />
        <ContentSkeleton />
      </SideNavGroup>

      <SideNavGroup className="mt-auto">
        <ContentSkeleton />
        <ContentSkeleton />
      </SideNavGroup>
    </SideNav>
  );
}
