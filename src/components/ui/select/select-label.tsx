import * as RadixSelect from "@radix-ui/react-select";
import { cva } from "class-variance-authority";
import { ElementRef, forwardRef, Ref } from "react";

const selectLabel = cva([
  "text-body-semibold-200",
  "text-neutral-11",
  "ml-3",
  "py-1",
]);

export const SelectLabel = forwardRef(
  (
    props: RadixSelect.SelectLabelProps,
    ref: Ref<ElementRef<typeof RadixSelect.SelectLabel>>
  ) => {
    return (
      <RadixSelect.SelectLabel
        {...props}
        className={selectLabel({ className: props.className })}
        ref={ref}
      />
    );
  }
);

SelectLabel.displayName = "SelectLabel";
