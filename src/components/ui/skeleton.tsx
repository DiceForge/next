import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded bg-neutral-3", className)}
      {...props}
    />
  );
}

export { Skeleton };
