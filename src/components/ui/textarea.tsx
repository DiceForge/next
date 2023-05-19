import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, ReactNode, Ref, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

import { displayHelpText } from "./common";
import { Label } from "./label";

const inputLayout = cva(["inline-flex", "flex-col", "gap-1"]);

const input = cva(
  [
    "inline-flex",
    "items-center",
    "rounded",
    "bg-neutral-4",
    "box-border",
    "border",
    "border-transparent",
    "text-neutral-12",
    "transition",
    "min-w-[280px]",
    "py-2",
    "px-3",

    "placeholder:text-neutral-11",

    "hover:bg-neutral-5",
    "focus-within:border-primary-9",
    "focus-within:outline",
    "focus-within:outline-4",
    "focus-within:outline-primary-4",
    "focus-within:bg-neutral-5",

    "disabled:cursor-not-allowed",
    "disabled:text-neutral-10",
    "disabled:placeholder:text-neutral-8",
  ],
  {
    variants: {
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
      status: "default",
      disabled: false,
    },
  }
);

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof input>, "disabled"> {
  label?: ReactNode;
  helpText?: ReactNode;
  errorText?: ReactNode;
  successText?: ReactNode;
}

type TextAreaRef = Ref<HTMLTextAreaElement>;

export const TextArea = forwardRef((props: TextAreaProps, ref: TextAreaRef) => {
  const {
    label,
    helpText,
    errorText,
    successText,
    status,
    style,
    className,
    disabled,
    ...rest
  } = props;

  return (
    <div className={inputLayout({ className })} style={style}>
      {label && <Label>{label}</Label>}

      <textarea
        className={cn(input({ status }))}
        disabled={disabled}
        {...rest}
        ref={ref}
      />

      {displayHelpText(status ?? "default", errorText, successText, helpText)}
    </div>
  );
});

TextArea.displayName = "TextArea";
