import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/utils";

export const sidenavVariants = cva(
  [
    "p-5",
    "box-border",
    "flex",
    "flex-col",
    "gap-5",
    "bg-neutral-2",
    "border-r",
    "border-r-neutral-6",
    "overflow-y-scroll",
    "w-[300px]",
    "transition-all",
  ],
  {
    variants: {
      collapsed: {
        true: ["group collapsed", "w-[80px]", "p-4"],
      },
    },
  }
);

type SideNavRef = Ref<HTMLDivElement>;
export type SideNavProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof sidenavVariants>;

export const SideNav = forwardRef((props: SideNavProps, ref: SideNavRef) => {
  const { collapsed, className, ...rest } = props;

  return (
    <div
      className={cn(sidenavVariants({ collapsed, className }))}
      {...rest}
      ref={ref}
    />
  );
});

SideNav.displayName = "SideNav";
