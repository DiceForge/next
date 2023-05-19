import { forwardRef, HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/utils";

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
}

type CardHeaderRef = Ref<HTMLDivElement>;

const CardHeader = forwardRef((props: CardHeaderProps, ref: CardHeaderRef) => {
  const { title, subtitle, className, ...rest } = props;

  return (
    <div
      className={cn("flex flex-col space-y-1.5", className)}
      {...rest}
      ref={ref}
    >
      <h3 className="truncate font-display text-header6 leading-none">
        {title}
      </h3>
      {subtitle && (
        <p className="text-body-semibold-300 text-neutral-11">{subtitle}</p>
      )}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

export default CardHeader;
