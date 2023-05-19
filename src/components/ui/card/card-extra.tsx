import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes, Ref } from "react";

const cardExtra = cva(["flex", "items-center", "gap-2"], {
  variants: {
    position: {
      start: [],
      end: ["justify-end"],
    },
  },

  defaultVariants: {
    position: "start",
  },
});

type Props = VariantProps<typeof cardExtra> & HTMLAttributes<HTMLDivElement>;
type ElRef = Ref<HTMLDivElement>;

const CardExtra = forwardRef((props: Props, ref: ElRef) => {
  const { className, position, ...rest } = props;

  return (
    <div className={cardExtra({ className, position })} {...rest} ref={ref} />
  );
});

CardExtra.displayName = "CardExtra";

export default CardExtra;
