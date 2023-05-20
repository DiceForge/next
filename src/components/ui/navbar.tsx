import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/utils";

const navbarVariants = cva(
  ["flex", "justify-between", "items-center", "gap-8"],
  {
    variants: {
      variant: {
        open: ["mb-6", "lg:mb-10"],
        bordered: [
          "border-b",
          "border-b-neutral-6",
          "h-[4.5rem]",
          "px-6",
          "lg:px-10",
          "bg-neutral-2",
        ],
      },
    },

    defaultVariants: {
      variant: "open",
    },
  }
);

export type NavbarProps = VariantProps<typeof navbarVariants> &
  HTMLAttributes<HTMLDivElement>;
type NavbarRef = Ref<HTMLDivElement>;

export const Navbar = forwardRef((props: NavbarProps, ref: NavbarRef) => {
  const { variant, className, ...rest } = props;

  return (
    <div
      className={cn(navbarVariants({ variant, className }))}
      {...rest}
      ref={ref}
    />
  );
});

Navbar.displayName = "Navbar";
