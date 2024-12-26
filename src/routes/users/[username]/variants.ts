import { tv } from "tailwind-variants";

export const recordVariants = tv({
  slots: {
    base: "flex items-center gap-x-4 rounded-md",
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
