import { tv, type VariantProps } from "tailwind-variants";

export type ButtonVariants = VariantProps<typeof button>;
export const button = tv({
  base: "select-none",
  variants: {
    variant: {
      primary: "bg-zinc-900 text-white active:bg-zinc-800 shadow-sm",
      secondary: "bg-zinc-100 active:bg-zinc-200",
    },
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
    variant: "primary",
    size: "md",
    rounded: "md",
  },
});
