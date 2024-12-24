import { tv } from "tailwind-variants";

export const recordVariants = tv({
  slots: {
    base: "flex items-center gap-x-4 rounded-md",
    name: "w-32 overflow-hidden text-ellipsis whitespace-nowrap break-keep hover:underline hover:text-blue-500",
  },
  variants: {
    variant: {
      default: {},
      highlight: {
        base: "bg-yellow-50",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
