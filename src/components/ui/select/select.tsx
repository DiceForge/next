import * as RadixSelect from "@radix-ui/react-select";
import { ComponentProps, ElementRef, forwardRef, ReactNode, Ref } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { Icon, IconName } from "@/components/ui/icon";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import { displayHelpText, InputStatus, styledPrefix } from "../common";

const selectTrigger = cva(
  [
    "text-body-regular-400",
    "inline-flex",
    "overflow-hidden",
    "items-center",
    "rounded",
    "bg-neutral-4",
    "border",
    "border-transparent",
    "box-border",
    "text-neutral-12",
    "transition",
    "data-[placeholder]:text-neutral-11",

    "hover:bg-neutral-5",
    "focus-within:border-primary-9",
    "focus-within:outline",
    "focus-within:outline-4",
    "focus-within:outline-primary-4",
    "focus-within:bg-neutral-5",
    "data-[state=open]:border-primary-9",
    "data-[state=open]:outline",
    "data-[state=open]:outline-4",
    "data-[state=open]:outline-primary-4",
    "data-[state=open]:bg-neutral-5",
    "disabled:bg-neutral-3",
    "disabled:cursor-not-allowed",
    "disabled:text-neutral-10",
    "disabled:placeholder:text-neutral-8",
  ],
  {
    variants: {
      size: {
        small: ["h-8"],
        default: ["h-10"],
        large: ["h-12"],
        brand: ["h-14"],
      },
      status: {
        default: [],
        error: [
          "border-danger-9",
          "outline-danger-4",
          "hover:border-danger-10",
          "focus-within:border-danger-10",
          "focus-within:outline-danger-4",
          "data-[state=open]:border-danger-10",
          "data-[state=open]:border-danger-10",
          "data-[state=open]:outline-danger-4",
        ],
        success: [
          "border-success-9",
          "outline-success-4",
          "hover:border-success-10",
          "focus-within:border-success-10",
          "focus-within:outline-success-4",
          "data-[state=open]:border-success-10",
          "data-[state=open]:border-success-10",
          "data-[state=open]:outline-success-4",
        ],
      },
    },

    defaultVariants: {
      size: "default",
    },
  }
);

const content = cva([
  "bg-surface",
  "shadow-md",
  "rounded",
  "overflow-hidden",
  "py-1",
  "z-50",
  "data-[state=open]:animate-open-menu",
  "data-[state=closed]:animate-close-menu",

  "max-h-[var(--radix-select-content-available-height)]",
  "w-[var(--radix-select-trigger-width)]",
]);

export interface SelectProps
  extends ComponentProps<typeof RadixSelect.Root>,
    Pick<ComponentProps<typeof RadixSelect.Value>, "placeholder">,
    Pick<ComponentProps<typeof RadixSelect.Trigger>, "style" | "className">,
    VariantProps<typeof selectTrigger> {
  errorText?: ReactNode;
  helpText?: ReactNode;
  icon?: IconName;
  label?: ReactNode;
  prefix?: ReactNode;
  status?: InputStatus;
  successText?: ReactNode;
}

type SelectRef = Ref<ElementRef<typeof RadixSelect.Trigger>>;

export const Select = forwardRef((props: SelectProps, ref: SelectRef) => {
  const {
    children,
    style,
    disabled,
    status,
    className,
    helpText,
    errorText,
    successText,
    icon,
    size,
    prefix,
    label,
    placeholder,
    ...rest
  } = props;

  return (
    <div className={cn("inline-flex min-w-[280px] flex-col gap-1", className)}>
      {label && <Label>{label}</Label>}

      <RadixSelect.Root {...rest}>
        <RadixSelect.Trigger
          className={cn(selectTrigger({ size, status }))}
          disabled={disabled}
          ref={ref}
          style={style}
        >
          {prefix && <div className={styledPrefix()}>{prefix}</div>}

          <div className="flex flex-1 items-center gap-2 px-3">
            {icon && <Icon className="text-neutral-11" name={icon} />}
            <RadixSelect.Value placeholder={placeholder} />
          </div>

          <div className="flex pr-3">
            <Icon className="text-neutral-11" name="ChevronDownIcon" />
          </div>
        </RadixSelect.Trigger>

        <RadixSelect.Portal>
          <RadixSelect.Content
            className={content()}
            position="popper"
            sideOffset={6}
          >
            <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>

      {displayHelpText(status, errorText, successText, helpText)}
    </div>
  );
});

Select.displayName = "Select";
