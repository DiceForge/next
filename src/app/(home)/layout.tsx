import { LayoutProps } from "@/types/next";
import TopNavigation from "@/components/layout/top-navigation";

export default async function Layout(props: LayoutProps) {
  return (
    <div className="m-6 flex max-w-container flex-col lg:m-10 xl:mx-auto">
      {/* @ts-expect-error Async Server Component */}
      <TopNavigation />

      {props.children}
    </div>
  );
}
