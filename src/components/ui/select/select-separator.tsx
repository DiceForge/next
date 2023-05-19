import * as RadixSelect from "@radix-ui/react-select";
import { ElementRef, forwardRef, Ref } from "react";
import { cva } from "class-variance-authority";

const selectSeparator = cva(["h-px", "m-2", "bg-neutral-6"]);

export const SelectSeparator = forwardRef(
  (
    props: RadixSelect.SelectSeparatorProps,
    ref: Ref<ElementRef<typeof RadixSelect.SelectSeparator>>
  ) => {
    return (
      <RadixSelect.SelectSeparator
        {...props}
        className={selectSeparator({ className: props.className })}
        ref={ref}
      />
    );
  }
);

SelectSeparator.displayName = "SelectSeparator";
