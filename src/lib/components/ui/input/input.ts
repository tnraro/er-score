import { tv, type VariantProps } from "tailwind-variants";

export type InputVariants = VariantProps<typeof input>;
export const input = tv({
  base: "border shadow-sm outline-none focus:ring-1 focus:ring-zinc-900",
  variants: {
    size: {
      xs: "h-4 px-1 text-xs",
      sm: "h-6 px-2 text-sm",
      md: "h-8 px-3",
      lg: "h-10 px-4 text-lg",
      xl: "h-12 px-5 text-xl",
    },
    rounded: {
      none: "",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
      full: "rounded-full",
    },
  },
  defaultVariants: {
    size: "md",
    rounded: "md",
  },
});
