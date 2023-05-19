import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const customMerge = extendTailwindMerge({
  classGroups: {
    fontSize: [
      "text-body-regular-100",
      "text-body-regular-200",
      "text-body-regular-300",
      "text-body-regular-400",
      "text-body-regular-500",
      "text-body-regular-600",
      "text-body-medium-100",
      "text-body-medium-200",
      "text-body-medium-300",
      "text-body-medium-400",
      "text-body-medium-500",
      "text-body-medium-600",
      "text-body-semibold-100",
      "text-body-semibold-200",
      "text-body-semibold-300",
      "text-body-semibold-400",
      "text-body-semibold-500",
      "text-body-semibold-600",
      "text-header1",
      "text-header2",
      "text-header3",
      "text-header4",
      "text-header5",
      "text-header6",
      "text-title",
    ],
  },
});

export function cn(...inputs: ClassValue[]) {
  return customMerge(clsx(inputs));
}
