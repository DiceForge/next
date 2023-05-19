import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes, Ref } from "react";

const card = cva([
  "bg-surface",
  "shadow-subtle",
  "rounded",
  "overflow-hidden",
  "flex",
  "flex-col",
  "border",
  "border-neutral-6",
]);

type Props = VariantProps<typeof card> & HTMLAttributes<HTMLDivElement>;
type ElRef = Ref<HTMLDivElement>;

const Card = forwardRef((props: Props, ref: ElRef) => {
  const { className, ...rest } = props;

  return <div className={card({ className })} {...rest} ref={ref} />;
});

Card.displayName = "Card";

export default Card;
