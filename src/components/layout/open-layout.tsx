import { PageLayout } from "@/types/next";
import TopNavigation from "@/components/layout/top-navigation";

const OpenLayout: PageLayout = (page) => {
  return (
    <div className="m-6 flex max-w-container flex-col lg:m-10 xl:mx-auto">
      <TopNavigation />

      {page}
    </div>
  );
};

export default OpenLayout;
