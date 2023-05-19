import { cva } from "class-variance-authority";
import { ReactNode } from "react";

export type InputStatus = "default" | "error" | "success";

export const styledPrefix = cva([
  "inline-flex",
  "px-2",
  "items-center",
  "border-r",
  "border-r-neutral-7",
  "h-full",
  "text-body-medium-200",
  "text-neutral-11",
]);

export const styledHelpText = cva(["m-0", "text-body-regular-200"], {
  variants: {
    status: {
      default: ["text-neutral-11"],
      error: ["text-danger-11"],
      success: ["text-success-11"],
    },
  },
});

export const displayHelpText = (
  status: InputStatus = "default",
  errorText: ReactNode,
  successText: ReactNode,
  helpText: ReactNode
) => {
  if (status === "error" && errorText) {
    return <p className={styledHelpText({ status })}>{errorText}</p>;
  }

  if (status === "success" && successText) {
    return <p className={styledHelpText({ status })}>{successText}</p>;
  }

  if (helpText) {
    return <p className={styledHelpText({ status })}>{helpText}</p>;
  }
};
