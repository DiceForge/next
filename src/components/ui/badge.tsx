import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLProps, Ref } from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "rounded-full",
    "px-3",
    "h-6",
    "whitespace-nowrap",
    "text-body-semibold-200",
    "border",
  ],
  {
    variants: {
      color: {
        primary: ["bg-primary-3", "text-primary-11", "border-primary-7"],
        accent: ["bg-accent-3", "text-accent-11", "border-accent-7"],
        neutral: ["bg-neutral-3", "text-neutral-11", "border-neutral-7"],
        danger: ["bg-danger-3", "text-danger-11", "border-danger-7"],
        success: ["bg-success-3", "text-success-11", "border-success-7"],
        blue: ["bg-blue-3", "text-blue-11", "border-blue-7"],
        orange: ["bg-orange-3", "text-orange-11", "border-orange-7"],
        yellow: ["bg-yellow-3", "text-yellow-11", "border-yellow-7"],
      },
    },

    defaultVariants: {
      color: "primary",
    },
  }
);

type BadgeProps = HTMLProps<HTMLDivElement> &
  VariantProps<typeof badgeVariants>;
type BadgeRef = Ref<HTMLDivElement>;

export const Badge = forwardRef((props: BadgeProps, ref: BadgeRef) => {
  const { color, className, ...rest } = props;

  return (
    <div
      className={cn(badgeVariants({ className, color }))}
      {...rest}
      ref={ref}
    />
  );
});

Badge.displayName = "Badge";
