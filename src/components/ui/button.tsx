import { cva, VariantProps } from "class-variance-authority";
import {
  ButtonHTMLAttributes,
  forwardRef,
  MouseEvent,
  Ref,
  useState,
} from "react";

import { Icon } from "@/components/ui/icon";

export const buttonVariants = cva(
  [
    "flex",
    "items-center",
    "justify-center",
    "rounded",
    "gap-2",
    "transition",
    "duration-200",
    "cursor-pointer",
    "box-border",
    "font-body",
    "outline-offset-1",
    "outline-4",
    "focus-visible:outline",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        default: ["disabled:bg-neutral-8", "disabled:text-neutral-2"],
        outlined: [
          "disabled:bg-neutral-2",
          "disabled:border-neutral-6",
          "disabled:text-neutral-9",
        ],
        tonal: ["disabled:bg-neutral-3", "disabled:text-neutral-9"],
        text: ["disabled:text-neutral-9"],
      },
      color: {
        primary: ["outline-primary-6"],
        accent: ["outline-primary-6"],
        neutral: ["outline-primary-6"],
        danger: ["outline-primary-6"],
        success: ["outline-primary-6"],
      },
      size: {
        small: ["h-8", "px-3", "text-body-semibold-300"],
        default: ["h-10", "px-4", "text-body-semibold-300"],
        large: ["h-12", "px-4", "text-body-semibold-400"],
        brand: ["h-14", "px-5", "gap-3", "text-body-semibold-500"],
      },
      fullWidth: {
        true: ["w-full"],
      },
      iconButton: {
        true: ["aspect-[1/1]"],
      },
      loading: {
        true: ["opacity-80", "pointer-events-none"],
      },
    },
    compoundVariants: [
      // Primary Variants
      {
        variant: "default",
        color: "primary",
        className: [
          "bg-primary-9",
          "text-white",
          "shadow-subtle",
          "hover:bg-primary-10",
          "active:bg-primary-11",
        ],
      },
      {
        variant: "outlined",
        color: "primary",
        className: [
          "bg-primary-2",
          "text-primary-11",
          "border",
          "border-primary-7",
          "shadow-subtle",
          "hover:bg-primary-3",
          "hover:border-primary-8",
          "active:bg-primary-4",
          "active:border-primary-9",
        ],
      },
      {
        variant: "tonal",
        color: "primary",
        className: [
          "bg-primary-4",
          "text-primary-11",
          "hover:bg-primary-5",
          "active:bg-primary-6",
        ],
      },
      {
        variant: "text",
        color: "primary",
        className: [
          "text-primary-11",
          "hover:bg-neutral-4",
          "active:bg-neutral-5",
        ],
      },

      // Accent Variants
      {
        variant: "default",
        color: "accent",
        className: [
          "bg-accent-9",
          "text-accent-12",
          "shadow-subtle",
          "hover:bg-accent-10",
          "active:bg-accent-11",
        ],
      },
      {
        variant: "outlined",
        color: "accent",
        className: [
          "bg-accent-2",
          "text-accent-11",
          "border",
          "border-accent-7",
          "shadow-subtle",
          "hover:bg-accent-3",
          "hover:border-accent-8",
          "active:bg-accent-4",
          "active:border-accent-9",
        ],
      },
      {
        variant: "tonal",
        color: "accent",
        className: [
          "bg-accent-4",
          "text-accent-11",
          "hover:bg-accent-5",
          "active:bg-accent-6",
        ],
      },
      {
        variant: "text",
        color: "accent",
        className: [
          "text-accent-11",
          "hover:bg-neutral-4",
          "active:bg-neutral-5",
        ],
      },

      // Neutral Variants
      {
        variant: "default",
        color: "neutral",
        className: [
          "bg-neutral-9",
          "text-white",
          "shadow-subtle",
          "hover:bg-neutral-10",
          "active:bg-neutral-11",
        ],
      },
      {
        variant: "outlined",
        color: "neutral",
        className: [
          "bg-neutral-2",
          "text-neutral-11",
          "border",
          "border-neutral-7",
          "shadow-subtle",
          "hover:bg-neutral-3",
          "hover:border-neutral-8",
          "active:bg-neutral-4",
          "active:border-neutral-9",
        ],
      },
      {
        variant: "tonal",
        color: "neutral",
        className: [
          "bg-neutral-4",
          "text-neutral-11",
          "hover:bg-neutral-5",
          "active:bg-neutral-6",
        ],
      },
      {
        variant: "text",
        color: "neutral",
        className: [
          "text-neutral-11",
          "hover:bg-neutral-4",
          "active:bg-neutral-5",
        ],
      },

      // Danger Variants
      {
        variant: "default",
        color: "danger",
        className: [
          "bg-danger-9",
          "text-white",
          "shadow-subtle",
          "hover:bg-danger-10",
          "active:bg-danger-11",
        ],
      },
      {
        variant: "outlined",
        color: "danger",
        className: [
          "bg-danger-2",
          "text-danger-11",
          "border",
          "border-danger-7",
          "shadow-subtle",
          "hover:bg-danger-3",
          "hover:border-danger-8",
          "active:bg-danger-4",
          "active:border-danger-9",
        ],
      },
      {
        variant: "tonal",
        color: "danger",
        className: [
          "bg-danger-4",
          "text-danger-11",
          "hover:bg-danger-5",
          "active:bg-danger-6",
        ],
      },
      {
        variant: "text",
        color: "danger",
        className: [
          "text-danger-11",
          "hover:bg-neutral-4",
          "active:bg-neutral-5",
        ],
      },

      // Success Variants
      {
        variant: "default",
        color: "success",
        className: [
          "bg-success-9",
          "text-white",
          "shadow-subtle",
          "hover:bg-success-10",
          "active:bg-success-11",
        ],
      },
      {
        variant: "outlined",
        color: "success",
        className: [
          "bg-success-2",
          "text-success-11",
          "border",
          "border-success-7",
          "shadow-subtle",
          "hover:bg-success-3",
          "hover:border-success-8",
          "active:bg-success-4",
          "active:border-success-9",
        ],
      },
      {
        variant: "tonal",
        color: "success",
        className: [
          "bg-success-4",
          "text-success-11",
          "hover:bg-success-5",
          "active:bg-success-6",
        ],
      },
      {
        variant: "text",
        color: "success",
        className: [
          "text-success-11",
          "hover:bg-neutral-4",
          "active:bg-neutral-5",
        ],
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "primary",
      size: "default",
      fullWidth: false,
      iconButton: false,
    },
  }
);

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {}

type ButtonRef = Ref<HTMLButtonElement>;

export const Button = forwardRef((props: ButtonProps, ref: ButtonRef) => {
  const {
    children,
    variant,
    color,
    size,
    fullWidth,
    iconButton,
    loading,
    className,
    onClick,
    ...rest
  } = props;
  const [internalLoading, setInternalLoading] = useState(false);

  const isLoading = internalLoading || loading;

  const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      setInternalLoading(true);

      Promise.resolve(onClick(e)).then(() => setInternalLoading(false));
    }
  };

  return (
    <button
      className={buttonVariants({
        size,
        variant,
        color,
        fullWidth,
        iconButton,
        loading: isLoading,
        className,
      })}
      onClick={clickHandler}
      {...rest}
      ref={ref}
    >
      {isLoading && <Icon className="animate-spin" name="Loader" />}
      <span className="flex gap-2">{children}</span>
    </button>
  );
});

Button.displayName = "Button";
