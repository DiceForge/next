import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, ReactNode, Ref } from "react";

import { cn } from "@/lib/utils";

import { Icon, IconName } from "./icon";
import { displayHelpText, styledPrefix } from "./common";
import { Label } from "./label";

const inputLayout = cva(["inline-flex", "flex-col", "gap-1", "min-w-[280px]"]);

const inputArea = cva(
  [
    "inline-flex",
    "overflow-hidden",
    "items-center",
    "rounded",
    "bg-neutral-4",
    "box-border",
    "border",
    "border-transparent",
    "text-neutral-12",
    "transition",
    "w-full",

    "hover:bg-neutral-5",
    "focus-within:border-primary-9",
    "focus-within:outline",
    "focus-within:outline-4",
    "focus-within:outline-primary-4",
    "focus-within:bg-neutral-5",
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
        ],
        success: [
          "border-success-9",
          "outline-success-4",
          "hover:border-success-10",
          "focus-within:border-success-10",
          "focus-within:outline-success-4",
        ],
      },
      disabled: {
        true: ["bg-neutral-3", "cursor-not-allowed"],
      },
    },

    defaultVariants: {
      size: "default",
      status: "default",
      disabled: false,
    },
  }
);

const input = cva([
  "flex-1",
  "w-0",
  "font-body",
  "text-body-regular-400",
  "bg-transparent",
  "text-neutral-12",
  "border-none",
  "outline-none",
  "min-w-0",
  "p-0",

  "placeholder:text-neutral-11",

  "disabled:cursor-not-allowed",
  "disabled:text-neutral-10",
  "disabled:placeholder:text-neutral-8",
]);

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix">,
    Omit<VariantProps<typeof inputArea>, "disabled"> {
  label?: ReactNode;
  helpText?: ReactNode;
  errorText?: ReactNode;
  successText?: ReactNode;
  startIcon?: IconName;
  endIcon?: IconName;
  prefix?: ReactNode;
}

type InputRef = Ref<HTMLInputElement>;

export const Input = forwardRef((props: InputProps, ref: InputRef) => {
  const {
    label,
    helpText,
    errorText,
    successText,
    prefix,
    status,
    startIcon,
    endIcon,
    size,
    style,
    className,
    disabled,
    ...rest
  } = props;

  return (
    <div className={cn(inputLayout({ className }))} style={style}>
      {label && <Label>{label}</Label>}

      <div className={cn(inputArea({ size, status, disabled }))}>
        {prefix && <div className={styledPrefix()}>{prefix}</div>}

        <div className="inline-flex flex-1 items-center gap-2 px-3">
          {startIcon && <Icon className="text-neutral-11" name={startIcon} />}

          <input className={input()} disabled={disabled} {...rest} ref={ref} />

          {endIcon && <Icon className="text-neutral-11" name={endIcon} />}
        </div>
      </div>

      {displayHelpText(status ?? "default", errorText, successText, helpText)}
    </div>
  );
});

Input.displayName = "Input";
