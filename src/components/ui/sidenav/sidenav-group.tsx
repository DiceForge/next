import { forwardRef, HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/utils";

export type GroupProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
};
type GroupRef = Ref<HTMLDivElement>;

export const SideNavGroup = forwardRef((props: GroupProps, ref: GroupRef) => {
  const { title, className, children, ...rest } = props;

  return (
    <div className={cn("flex flex-col gap-1", className)} {...rest} ref={ref}>
      {title && (
        <span className="pl-4 text-body-semibold-300 text-neutral-11 group-[.collapsed]:hidden">
          {title}
        </span>
      )}
      {children}
    </div>
  );
});

SideNavGroup.displayName = "SideNavGroup";
