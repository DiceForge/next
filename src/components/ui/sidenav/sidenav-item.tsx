"use client";

import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, ElementRef, forwardRef, Ref } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { Icon, IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export const sidenavItemVariants = cva(
  [
    "flex",
    "items-center",
    "gap-3",
    "rounded",
    "h-12",
    "px-4",
    "cursor-pointer",
    "transition",
    "text-body-medium-400",

    "hover:bg-neutral-4",
    "active:bg-neutral-5",
    "focus-visible:outline-4",
    "focus-visible:outline-primary-6",

    "group-[.collapsed]:px-3",
    "group-[.collapsed]:justify-center",
  ],
  {
    variants: {
      active: {
        true: [
          "group active",
          "bg-primary-3",
          "text-primary-11",

          "hover:bg-primary-4",
          "active:bg-primary-5",
        ],
      },
    },
  }
);

export type ItemProps = ComponentProps<typeof Link> &
  VariantProps<typeof sidenavItemVariants> & {
    icon: IconName;
  };
type ItemRef = Ref<ElementRef<typeof Link>>;

export const SideNavItem = forwardRef((props: ItemProps, ref: ItemRef) => {
  const { active, className, icon, children, ...rest } = props;
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        sidenavItemVariants({
          active: active ?? pathname === props.href,
          className,
        })
      )}
      {...rest}
      ref={ref}
    >
      <Icon
        className={cn("text-neutral-11 group-[.active]:text-primary-11")}
        name={icon}
        size={20}
      />
      <span className="group-[.collapsed]:hidden">{children}</span>
    </Link>
  );
});

SideNavItem.displayName = "SideNavItem";
