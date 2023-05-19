import * as RadixSelect from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { ComponentProps, ElementRef, forwardRef, ReactNode, Ref } from "react";

import { Icon, IconName } from "@/components/ui/icon";

const selectItem = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "box-border",
    "cursor-pointer",
    "px-3",
    "py-1",
    "gap-3",
    "outline-none",
    "transition",

    "data-[state=checked]:text-primary-11",
    "data-[highlighted]:bg-neutral-3",
    "data-[highlighted]:active:bg-neutral-4",
  ],
  {
    variants: {
      hasDescription: {
        true: ["text-body-semibold-400"],
        false: ["text-body-regular-400"],
      },
    },
  }
);

export interface SelectItemProps
  extends ComponentProps<typeof RadixSelect.SelectItem> {
  subtitle?: ReactNode;
  description?: ReactNode;
  icon?: IconName;
}

type SelectRef = Ref<ElementRef<typeof RadixSelect.SelectItem>>;

export const SelectItem = forwardRef(
  (props: SelectItemProps, ref: SelectRef) => {
    const { subtitle, description, icon, className, children, ...rest } = props;

    return (
      <RadixSelect.SelectItem
        {...rest}
        className={selectItem({
          className,
          hasDescription: Boolean(description),
        })}
        ref={ref}
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {icon && <Icon name={icon} />}
            <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
            {subtitle && (
              <span className="text-body-regular-300 text-neutral-11">
                {subtitle}
              </span>
            )}
          </div>

          {description && (
            <span className="text-body-regular-200">{description}</span>
          )}
        </div>

        <div className="min-w-[20px]">
          <RadixSelect.ItemIndicator>
            <Icon name="CheckIcon" />
          </RadixSelect.ItemIndicator>
        </div>
      </RadixSelect.SelectItem>
    );
  }
);

SelectItem.displayName = "SelectItem";
