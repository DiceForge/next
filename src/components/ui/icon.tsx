import * as Icons from "lucide-react";
import { ComponentProps } from "react";
import { cva, VariantProps } from "class-variance-authority";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type IconName = keyof Omit<typeof Icons, "createLucideIcon">;

const singleIcon = cva(["ui-text-inherit", "ui-min-w-fit"]);

export interface IconProps
  extends ComponentProps<typeof Icons["BoxIcon"]>,
    VariantProps<typeof singleIcon> {
  name: IconName;
}

export const Icon = (props: IconProps) => {
  const { name, size = 20, className, ...rest } = props;
  const SingleIcon: LucideIcon = Icons[name];

  return (
    <SingleIcon
      className={cn(singleIcon({ className }))}
      size={size}
      {...rest}
    />
  );
};
