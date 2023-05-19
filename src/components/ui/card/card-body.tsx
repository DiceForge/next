import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, HTMLAttributes, Ref } from "react";

const cardBody = cva([
  "p-4",
  "flex",
  "flex-col",
  "gap-3",
  "flex-1",
  "text-body-regular-300",
]);

type Props = VariantProps<typeof cardBody> & HTMLAttributes<HTMLDivElement>;
type ElRef = Ref<HTMLDivElement>;

const CardBody = forwardRef((props: Props, ref: ElRef) => {
  const { className, ...rest } = props;

  return <div className={cardBody({ className })} {...rest} ref={ref} />;
});

CardBody.displayName = "CardBody";

export default CardBody;
