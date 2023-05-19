import { LayoutProps } from "@/types/next";

export default function Layout(props: LayoutProps) {
  return (
    <div className="mx-auto mt-10 box-border flex w-full max-w-[480px] flex-col items-center">
      {props.children}
    </div>
  );
}
