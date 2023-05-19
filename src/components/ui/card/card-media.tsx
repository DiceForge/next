import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, Ref } from "react";
import Image, { ImageProps } from "next/image";

const cardMedia = cva(["w-full", "object-cover"], {
  variants: {
    aspectRatio: {
      tall: ["aspect-[4/3]"],
      wide: ["aspect-[16/10]"],
    },
  },
  defaultVariants: {
    aspectRatio: "wide",
  },
});

type Props = VariantProps<typeof cardMedia> & ImageProps;
type ElRef = Ref<HTMLImageElement>;

const CardMedia = forwardRef((props: Props, ref: ElRef) => {
  const { className, ...rest } = props;

  return <Image className={cardMedia({ className })} {...rest} ref={ref} />;
});

CardMedia.displayName = "CardMedia";

export default CardMedia;
