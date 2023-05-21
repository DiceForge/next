import { PageLayout } from "@/types/next";
import SideNavigation from "@/components/layout/side-navigation";
import TopNavigation from "@/components/layout/top-navigation";

const BorderedLayout: PageLayout = (page) => {
  return (
    <div className="flex min-h-screen">
      <SideNavigation className="hidden lg:flex" />

      <div className="flex w-full flex-1 flex-col">
        <TopNavigation variant="bordered" />

        <div className="flex-1 p-6 lg:p-10">{page}</div>
      </div>
    </div>
  );
};

export default BorderedLayout;
